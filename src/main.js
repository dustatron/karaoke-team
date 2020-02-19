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

  if (view === "0") {
    console.log("render dashboard", view);
  } else if (view === "1") {
    console.log("render playlist", view);
  } else if (view === "2") {
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
      showRooms(userID);
      $(".login").hide();
      $(".site").show();
    } else {
      $(".site").hide();
      loginUI.start("#firebaseui-auth-container", {
        signInSuccessUrl: "?0",
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
    console.log("click");
    console.log(firebase.auth().currentUser);
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
      console.log("seartch object", searchObj);
      if (response.items.length > 0) {
        render.ytSearch(searchObj); //Print to Dom
      } else {
        $(".search-results").html("no results");
      }
    })();
  }); //end search submit

  ///////////////////////////////////////////////////////////
  /////////////// Playlist buttons ////////////////////////
  //------- delete
  $(".rooms--list").on("click", ".show-delete", function() {
    dbRooms.doc(this.value).delete();
  });
  //------- playlist view
  $(".rooms--list").on("click", ".show-playlist", function() {
    window.location.href = `../?1${this.value}`;
  });
  //------- show view
  $(".rooms--list").on("click", ".show-main-show", function() {
    window.location.href = `../?2${this.value}`;
  });
  //------- show invite link
  $(".rooms--list").on("click", ".show-invite", function() {
    let valueOfButton = this.value;
    $(`#share-link-${valueOfButton}`).slideToggle();
  });

  $(".rooms--list").on("click", ".copy-to-clipboard", function() {
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
          console.log("order is ", currentOrderNum);
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

      console.log(tempObj);

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
    console.log(render.listObj);
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
  let player = YouTubePlayer("player");
  player.loadVideoById("7X1zFEoJHvs");
  let isPlaying = false;

  // PLAY BUTTON NOT WORKING CORRECTLY
  $("#play").click(() => {
    let playState;
    function changeState() {
      playState = true;
    }
    dbRooms.doc(currentRoom).get().then((doc) => {
      if (doc.exists) {
        changeState();
      }
    });
    console.log(playState);

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

  $("#stop").click(() => {
    player.stopVideo();
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
    console.log(render.listObj[0].docId);
    dbRooms.doc(currentRoom).collection("playlist").doc(render.listObj[0].docId).delete().then(() => {
      player.loadVideoById(render.listObj[0].videoLink);
    });
  }
}); //End document ready
