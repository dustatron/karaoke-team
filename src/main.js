import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

import "./scss/main.scss";
import $ from "jquery";
import { YtSearch } from "./youtube-search-service";
import { Render } from "./render";
import { IframeService } from "./iframe-service";

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
const dbTestRoom = db.collection("rooms").doc("testroom");
const dbRooms = db.collection("rooms");


// firebase Auth
let loginUI = new firebaseui.auth.AuthUI(firebase.auth());
let ytSearch = new YtSearch();

////////////////////////////////////////////////////////////////
//////////////////////   DOC READY  ////////////////////////////
$(document).ready(function () {
  let searchObj = {};
  

  //Login condition
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      let userID = firebase.auth().currentUser.uid;
      showRooms(userID)
      $(".login").hide();
      $(".site").show();
    } else {
      $(".site").hide();
      loginUI.start("#firebaseui-auth-container", {
        signInSuccessUrl: "#",
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

// new room listener
  $("#room-name-btn").click(function (event) {
    event.preventDefault();
    console.log('click');
    console.log(firebase.auth().currentUser);
    let roomObj = {
      userId: firebase.auth().currentUser.uid,
      userName: firebase.auth().currentUser.displayName,
      userPhoto: firebase.auth().currentUser.photoURL,
      roomName: $("input#room-name").val(),
      playing: false,
      order: 1,
      currentSong: 0,
      timeCreated: new Date().getTime(),
    };
    dbRooms.add(roomObj);
  });

  $(".search-form").submit((event) => {
    event.preventDefault();
    let render = new Render();
    let ytSearchInput = $("#ytSearchInput").val();
    $('.search-results').slideDown();


    (async () => {
      const response = await ytSearch.getSongByTitle(ytSearchInput);
      searchObj = response;
      console.log('seartch object', searchObj);
      if (response.items.length > 0) {
        render.ytSearch(searchObj); //Print to Dom
      } else {
        $(".search-results").html('no results');
      }
    })();
  }); //end search submit

  $('.search-results').on('click', 'button', function () {
    let that = this;
    async function pushSong() {
      let dataObj = searchObj.items[that.id];
      let currentOrderNum;

      await dbTestRoom.get().then(function (doc) {
        if (doc.exists) {
          currentOrderNum = doc.data().order;
          console.log('order is ', currentOrderNum);
        } else {
          // doc.data() will be undefined in this case
          console.error("No such document!");
        }
      });

      let tempObj = {
        user: 'user',
        order: currentOrderNum,
        videoLink: dataObj.id.videoId,
        videoName: dataObj.snippet.title,
        createdAt: new Date().getTime(),
        img: dataObj.snippet.thumbnails.default.url
      }

      console.log(tempObj);

      dbTestRoom.collection('playlist').add(tempObj).then(function () {
        console.log("Document successfully updated!");
      })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      $('.search-results').slideUp();

      dbTestRoom.update({ order: currentOrderNum += 1 });
    }

    pushSong();
  }); //-------------------  Click event listener

  // print to DOM from database
  dbTestRoom.collection("playlist").orderBy("order").onSnapshot((querySnapshot) => {
    let printString = "";
    let render = new Render();
    render.playlist(querySnapshot);
  });
  //print room list
  function showRooms(uid) {
    dbRooms.where("userId", "==", uid).orderBy("timeCreated").onSnapshot(function(querySnapshot) {
      let printList = "";
      querySnapshot.forEach(function(room) {
        printList += `<li> ${room.data().roomName} </li>`
      });
      $(".rooms--list").html(printList);
    });
  }

  $('.playlist-render').on('click', '.delete', function () {
    dbTestRoom.collection("playlist").doc(this.name).delete();
  });

  $('.playlist-render').on('click', '.moveUp', function () {
    let aboveObj = this.value - 1;
    let that = this;
    if (parseInt(this.value) > 1) {
      (async () => {
        await dbTestRoom.collection("playlist").where("order", "==", aboveObj).get().then(function (docs) {
          docs.forEach(function (doc) {
            dbTestRoom.collection("playlist").doc(doc.id).update({ order: parseInt(that.value) });
            console.log("up", doc.id);
          });
        });

        dbTestRoom.collection("playlist").doc(this.name).update({ order: parseInt(this.value) - 1 });
      })();
    }

  });

  $('.playlist-render').on('click', '.moveDown', function () {
    let belowObj = parseInt(this.value) + 1;
    let that = this;

    (async () => {
      await dbTestRoom.collection("playlist").where("order", "==", belowObj).get().then(function (docs) {
        docs.forEach(function (doc) {
          dbTestRoom.collection("playlist").doc(doc.id).update({ order: parseInt(that.value) });
          console.log("down", doc.id);
        });
      });

      dbTestRoom.collection("playlist").doc(this.name).update({ order: parseInt(this.value) + 1 });
    })();
  });

  console.log("dom loaded");

  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  console.log("tag: ", tag);


  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  let iframeService = new IframeService();

  iframeService.onYouTubePlayerAPIReady();

  // iframeService.onPlayerReady();
  // iframeService.onPlayerStateChange();
  // iframeService.stopVideo();

  $("#play").click(function () {
    iframeService.playVideo()
  });
  $("#stop").click(function () {
    iframeService.stopVideo()
  });
  $("#pause").click(function () {
    iframeService.pauseVideo()
  });
  $("#next").click(function () {
    iframeService.nextVideo()
  });

}); //End document ready
