import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

import "./scss/main.scss";
import $ from "jquery";
import { YtSearch } from "./youtube-search-service";
import { Render } from "./render";
import YouTubePlayer from "youtube-player";

const firebaseConfig = {
  apiKey: "AIzaSyC-YzJrwqc7dqtxy1dGAMvAvymJ-ZF1F3M",
  authDomain: "karaoke-team.firebaseapp.com",
  databaseURL: "https://karaoke-team.firebaseio.com",
  projectId: "karaoke-team",
  storageBucket: "karaoke-team.appspot.com",
  messagingSenderId: "34887574579",
  appId: "1:34887574579:web:3e3d24e14b4ae3830a6f46",
  measurementId: "G-G0KQY59TBD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // Initialize the FirebaseUI Widget using Firebase.
}

///////////////////////////////////////////////////////////////
/////////////////// Load Constructors ////////////////////////

// setting ref to database
const db = firebase.firestore();
// const dbTest = db.collection("test");
// const dbTestRoom = db.collection("rooms").doc("testroom");
const dbRooms = db.collection("rooms");

const render = new Render();

// firebase Auth
let loginUI = new firebaseui.auth.AuthUI(firebase.auth());
let ytSearch = new YtSearch();

let currentRoom = window.location.search.substring(2);
let thisView = window.location.search.substring(1).charAt(0);

function getView() {
  let view = window.location.search.substring(1).charAt(0);
  let roomId = window.location.search.substring(2);

  if (view === "0" || !view) {
    //Main room
    $(".show-screen").hide();
    $(".playlist").hide();
    console.log("render dashboard", view);
  } else if (view === "1") {
    $(".room-view").hide();
    $(".playlist").fadeIn();
    $(".show-screen").hide();
    $(".login").hide();

    console.log("render playlist", view);
  } else if (view === "2") {
    $(".room-view").hide();
    $(".playlist").hide();
    $(".show-screen").fadeIn();
    $(".login").hide();
    console.log("render show", view);
  } else {
    console.log("no room param", view);
  }

  return roomId;
}

////////////////////////////////////////////////////////////////
//////////////////////   DOC READY  ////////////////////////////
$(document).ready(function() {
  let searchObj = {};

  ////////////////////////////////////////////////////////////////
  //////////////////////   Login Auth  ////////////////////////////
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      getView();
      let userID = firebase.auth().currentUser.uid;
      $(".site").show();
      showRooms(userID);
    } else {
      let link = "";
      if (thisView === 1) {
        link = `?${thisView}${currentRoom}`;
      }
      $(".login").show();
      loginUI.start("#firebaseui-auth-container", {
        signInSuccessUrl: link,
        signInOptions: [
          // List of OAuth providers supported.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: "#",
        // Privacy policy url.
        privacyPolicyUrl: "#"
      });
    }
  });

  /////////////////////////////////////////////////////////////////
  //////////////////////   Listeners  ////////////////////////////

  // Add new room button
  $(".rooms").on("click", "#room-name-btn", function(event) {
    event.preventDefault();
    let roomObj = {
      userId: firebase.auth().currentUser.uid,
      userName: firebase.auth().currentUser.displayName,
      userPhoto: firebase.auth().currentUser.photoURL,
      roomName: $("input#room-name").val(),
      playing: false,
      order: 1,
      currentSong: 0,
      timeCreated: new Date().getTime()
    };
    dbRooms.add(roomObj);
  });

  $(".search-form").submit((event) => {
    event.preventDefault();
    let render = new Render();
    let ytSearchInput = $("#ytSearchInput").val();
    $(".search-results").slideDown();

    (async () => {
      const response = await ytSearch.getSongByTitle(ytSearchInput);
      searchObj = response;
      if (!response) {
        $(".search-results").html(
          `<p class="text-center">Your search returned an error status of ${ytSearch.errorMessage}</p>`
        );
      } else if (response.items.length > 0) {
        render.ytSearch(searchObj); //Print to Dom
      } else {
        $(".search-results").html("no results");
      }
    })();
  }); //end search submit

  // ----------- Logout ---------- \\
  $(".logout").click(() => {
    firebase.auth().signOut();
    window.location.href = `../`;
  });

  ///////////////////////////////////////////////////////////
  /////////////// Playlist buttons ////////////////////////
  //------- delete
  $(".rooms").on("click", ".show-delete", function() {
    dbRooms.doc(this.value).delete();
  });
  //------- playlist view
  $(".rooms").on("click", ".show-playlist", function() {
    window.location.href = `../?1${this.value}`;
  });
  //------- show view
  $(".rooms").on("click", ".show-main-show", function() {
    window.location.href = `../?2${this.value}`;
  });
  //------- show invite link
  $(".rooms").on("click", ".show-invite", function() {
    let valueOfButton = this.value;
    $(`#share-link-${valueOfButton}`).slideToggle();
  });

  $(".rooms").on("click", ".copy-to-clipboard", function() {
    let nameValue = this.name;
    let copyInput = document.getElementById(`${nameValue}-input`);
    copyInput.select();
    copyInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
  });

  //////////////////////////////////////////////////////////
  ////////////////// Playlist  ////////////////////////////

  //---------Search button
  $(".search-results").on("click", "button", function() {
    let that = this;
    async function pushSong() {
      let dataObj = searchObj.items[that.id];
      let currentOrderNum = "testroom";

      await dbRooms.doc(currentRoom).get().then(function(doc) {
        if (doc.exists) {
          currentOrderNum = doc.data().order;
        } else {
          // doc.data() will be undefined in this case
          console.error("No such document!");
        }
      });

      let tempObj = {
        user: firebase.auth().currentUser.displayName,
        order: currentOrderNum,
        videoLink: dataObj.id.videoId,
        videoName: dataObj.snippet.title,
        createdAt: new Date().getTime(),
        img: dataObj.snippet.thumbnails.default.url
      };

      dbRooms
        .doc(currentRoom)
        .collection("playlist")
        .add(tempObj)
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      $(".search-results").slideUp(1000);

      dbRooms.doc(currentRoom).update({ order: (currentOrderNum += 1) });
    }

    pushSong();
  });

  //---Playlist delete song
  $(".playlist-render").on("click", ".delete", function() {
    dbRooms.doc(currentRoom).collection("playlist").doc(this.name).delete();
  });

  //---Playlist move song up
  $(".playlist-render").on("click", ".moveUp", function() {
    let aboveObj = this.value - 1;
    let that = this;
    if (parseInt(this.value) > 1) {
      (async () => {
        await dbRooms
          .doc(currentRoom)
          .collection("playlist")
          .where("order", "<", parseInt(this.value))
          .orderBy("order", "desc")
          .limit(1)
          .get()
          .then(function(docs) {
            docs.forEach(function(doc) {
              dbRooms.doc(currentRoom).collection("playlist").doc(doc.id).update({ order: parseInt(that.value) });
              console.log("up", doc.data().order);
            });
          });

        dbRooms.doc(currentRoom).collection("playlist").doc(this.name).update({ order: parseInt(this.value) - 1 });
      })();
    }
  });

  //---Playlist move song down
  $(".playlist-render").on("click", ".moveDown", function() {
    let that = this;
    (async () => {
      await dbRooms
        .doc(currentRoom)
        .collection("playlist")
        .where("order", ">", parseInt(this.value))
        .orderBy("order", "asc")
        .limit(1)
        .get()
        .then(function(docs) {
          docs.forEach(function(doc) {
            console.log("down", doc.data().order);
            dbRooms.doc(currentRoom).collection("playlist").doc(doc.id).update({ order: parseInt(that.value) });
          });
        });

      dbRooms.doc(currentRoom).collection("playlist").doc(this.name).update({ order: parseInt(this.value) + 1 });
    })();
  });

  //-------------------  DOM PRINTS ------------------\\

  // function DomPrintPlaylist(room) {
  console.log("dom", currentRoom);

  // print Playlist
  dbRooms.doc(currentRoom).collection("playlist").orderBy("order").onSnapshot((querySnapshot) => {
    render.playlist(querySnapshot);
    if (render.listObj.length == 0) {
      $(".playlist-render").append(`<p> you have no more songs in your playlist </p>`);
    }
    dbRooms.doc(currentRoom).get().then((docs) => {
      $(".room-name").html(docs.data().roomName);
    });
  });

  // }

  // print room list
  function showRooms(uid) {
    dbRooms.where("userId", "==", uid).orderBy("timeCreated").onSnapshot(function(querySnapshot) {
      let printList = "";
      querySnapshot.forEach(function(room) {
        printList += `<li> ${room.data().roomName} </li>`;
      });
      render.roomList(querySnapshot);

      // $(".rooms--list").html(printList);
    });
  }

  ///////////////////////////////////////////////////////////////
  ////////////////// Video Players  ////////////////////////////

  /////////////// Show Page ///////////////

  // Player //
  let player = YouTubePlayer("player", {
    controls: 0,
    modestbranding: 1
  });

  player.loadVideoById("Gvzu8TNCpmo");
  let isPlaying = false;

  // PLAY BUTTON NOT WORKING CORRECTLY
  $("#play").click(() => {
    player.playVideo();

    dbRooms.doc(currentRoom).get().then((doc) => {
      if (doc.exists) {
        changeState();
      }
    });

    if (!playState) {
      advanceSong();
      dbRooms.doc(currentRoom).update({ playing: true });
    } else if (playState && !isPlaying) {
      player.playVideo();
      isPlaying = true;
    } else if (playState && isPlaying) {
      player.pauseVideo();
      isPlaying = false;
    }
  });

  $("#pause").click(() => {
    player.pauseVideo();
  });

  $("#next").click(() => {
    advanceSong();
  });

  player.on("stateChange", (event) => {
    if (event.data === 0) {
      advanceSong();
    }
  });
  function advanceSong() {
    // if playlist is empty, play end song
    let playlist = render.listObj;
    if (playlist.length == 0) {
      player.loadVideoById("G2Wm5aZC1BQ");
    }

    render.updateCurrentSong();

    dbRooms.doc(currentRoom).collection("playlist").doc(render.listObj[0].docId).delete().then(() => {
      player.loadVideoById(render.currentSong.videoLink);
    });
  }
}); //End document ready
