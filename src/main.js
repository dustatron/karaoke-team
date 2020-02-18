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
// const dbTestRoom = db.collection("rooms").doc("testroom");
const dbRooms = db.collection("rooms");

const render = new Render();


// firebase Auth
let loginUI = new firebaseui.auth.AuthUI(firebase.auth());
let ytSearch = new YtSearch();
let currentRoom = window.location.search.substring(1);

////////////////////////////////////////////////////////////////
//////////////////////   DOC READY  ////////////////////////////
$(document).ready(function () {
  let searchObj = {};
  render.roomListListen();
  console.log("currentroom let", window.location.search.substring(1) );


  ////////////////////////////////////////////////////////////////
  //////////////////////   Login Auth  ////////////////////////////
  firebase.auth().onAuthStateChanged((user) => {
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

  /////////////////////////////////////////////////////////////////
  //////////////////////   Listeners  ////////////////////////////

  // Add new room button
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

  //Delete room button
  $('.rooms--list').on('click', '.show-delete', function () {
    dbRooms.doc(this.value).delete();
  });

  $('.rooms--list').on('click', '.show-playlist', function () {
    window.location.href = `../?${this.value}`
    
  });

  //////////////////////////////////////////////////////////
  ////////////////// Playlist  ////////////////////////////

  //---------Search button
  $('.search-results').on('click', 'button', function () {
    let that = this;
    async function pushSong() {
      let dataObj = searchObj.items[that.id];
      let currentOrderNum = "testroom";

      await dbRooms.doc(currentRoom).get().then(function (doc) {
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

      dbRooms.doc(currentRoom).collection('playlist').add(tempObj).then(function () {
        console.log("Document successfully updated!");
      })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      $('.search-results').slideUp();

      dbRooms.doc(currentRoom).update({ order: currentOrderNum += 1 });
    }

    pushSong();
  }); 

  //---Playlist delete song
  $('.playlist-render').on('click', '.delete', function () {
    dbRooms.doc(currentRoom).collection("playlist").doc(this.name).delete();
  });

  //---Playlist move song up
  $('.playlist-render').on('click', '.moveUp', function () {
    let aboveObj = this.value - 1;
    let that = this;
    if (parseInt(this.value) > 1) {
      (async () => {
        await dbRooms.doc(currentRoom).collection("playlist").where("order", "==", aboveObj).get().then(function (docs) {
          docs.forEach(function (doc) {
            dbRooms.doc(currentRoom).collection("playlist").doc(doc.id).update({ order: parseInt(that.value) });
            console.log("up", doc.id);
          });
        });

        dbRooms.doc(currentRoom).collection("playlist").doc(this.name).update({ order: parseInt(this.value) - 1 });
      })();
    }

  });

  //---Playlist move song down
  $('.playlist-render').on('click', '.moveDown', function () {
    let belowObj = parseInt(this.value) + 1;
    let that = this;

    (async () => {
      await dbRooms.doc(currentRoom).collection("playlist").where("order", "==", belowObj).get().then(function (docs) {
        docs.forEach(function (doc) {
          dbRooms.doc(currentRoom).collection("playlist").doc(doc.id).update({ order: parseInt(that.value) });
          console.log("down", doc.id);
        });
      });

      dbRooms.doc(currentRoom).collection("playlist").doc(this.name).update({ order: parseInt(this.value) + 1 });
    })();
  });
  
  
  
  
  //-------------------  DOM PRINTS ------------------\\

// function DomPrintPlaylist(room) {
  console.log('dom', currentRoom)

  // print Playlist
  dbRooms.doc(currentRoom).collection("playlist").orderBy("order").onSnapshot((querySnapshot) => {
    let printString = "";
    render.playlist(querySnapshot);
  });

// }

  // print room list
  function showRooms(uid) {
    dbRooms.where("userId", "==", uid).orderBy("timeCreated").onSnapshot(function (querySnapshot) {
      let printList = "";
      querySnapshot.forEach(function (room) {
        printList += `<li> ${room.data().roomName} </li>`
      });
      render.roomList(querySnapshot);

      // $(".rooms--list").html(printList);
    });
  }



  ///////////////////////////////////////////////////////////////
  ////////////////// Video Players  ////////////////////////////

/////////////// Show Page ///////////////

  // Show playlist //
  dbTestRoom.collection("playlist").orderBy("order").onSnapshot((results) => {
    let render = new Render();
    console.log("querySnapshot: ", results);

    results.forEach(function(result){
      console.log("result: ", result);
      // $("#show-playlist").html(
      //   `<div name="${item.data().videoLink}" id="${item.id}" class="playlist-box">
      //     <div class ="playlist--title"> ${item.data().videoName} </div>
      //     <div class="playlist--order"> ${item.data().order} <img src="${item.data().img}"></div>
      //     <div class="playlist--user"> ${item.data().user} </div>
      //     <div class="playlist--buttons">
      //         <button class="btn btn-danger delete" name="${item.id}">delete song</button>
      //         <button class="btn btn-success moveUp" name="${item.id}" value="${item.data().order}"><i class="fas fa-arrow-up"></i></button>
      //         <button class="btn btn-success moveDown" name="${item.id}" value="${item.data().order}"><i class="fas fa-arrow-down"></i></button>
      //     </div>
      //   </div>`)
    })
  //   querySnapshot.forEach((item) => {
  //     printString += `<div name="${item.data().videoLink}" id="${item.id}" class="playlist-box">
  //         <div class ="playlist--title"> ${item.data().videoName} </div>
  //         <div class="playlist--order"> ${item.data().order} <img src="${item.data().img}"></div>
  //         <div class="playlist--user"> ${item.data().user} </div>
  //         <div class="playlist--buttons">
  //             <button class="btn btn-danger delete" name="${item.id}">delete song</button>
  //             <button class="btn btn-success moveUp" name="${item.id}" value="${item.data().order}"><i class="fas fa-arrow-up"></i></button>
  //             <button class="btn btn-success moveDown" name="${item.id}" value="${item.data().order}"><i class="fas fa-arrow-down"></i></button>
  //         </div>
  //     </div>`
  // });
  //   $("#show-playlist").html("Playlist");
    // $("#show-playlist").html(printString);
  });

  // Get the 1st song in playlist //
  // let videoID;
  // (async () => {
  //   await dbTestRoom.collection("playlist").where("order", "==", 1).limit(1).onSnapshot(function(docs) {
  //     docs.forEach(function(doc) {
  //       console.log("doc: ", doc);
  //       videoID = doc.data().videoLink;
  //       console.log("videoLink: ", videoID);
  //     });
  //   });
  //   console.log("videoID: ", videoID);
  // })(); 


  // Create a new script tag to call the iFrame API //
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  console.log("tag: ", tag);


  // Instantiate the new API constructor and methods, pass the videoID //
  let iframeService = new IframeService();

  iframeService.onYouTubePlayerAPIReady('8UFt4ru5S44');

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
