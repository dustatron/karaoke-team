import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

import "./scss/main.scss";
import $ from "jquery";
import { YtSearch } from "./youtube-search-service";
import { Render } from "./render";

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

// setting ref to database
const db = firebase.firestore();
// const dbTest = db.collection("test");
const dbTestRoom = db.collection("rooms").doc("testroom");
const increment = firebase.firestore.FieldValue.increment(+1);

// firebase Auth
let loginUI = new firebaseui.auth.AuthUI(firebase.auth());
let ytSearch = new YtSearch();

$(document).ready(function () {
  let searchObj = {};
  let userID;

  //Login condition
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      userID = firebase.auth().currentUser.uid;
      $(".login").hide();
      $(".site").show();
      console.log("userID", userID);
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

  //get form submit button
  $("form").submit((event) => {
    event.preventDefault();
    let render = new Render();
    let ytSearchInput = $("#ytSearchInput").val();
    $('.search-results').slideDown();


    (async () => {
      const response = await ytSearch.getSongByTitle(ytSearchInput);
      searchObj = response;
      console.log('seartch object',searchObj);
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

      dbTestRoom.update({order: currentOrderNum += 1 });
    }

    pushSong();
  }); //-------------------  Click event listener

  // print to DOM from database
  dbTestRoom.collection("playlist").orderBy("order").onSnapshot((querySnapshot) => {
    let printString = "";
    let render = new Render();
    render.playlist(querySnapshot);
  });

  $('.playlist-render').on('click', '.delete', function(){
    dbTestRoom.collection("playlist").doc(this.name).delete();
  });
});//end Document ready
