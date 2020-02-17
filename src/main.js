import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

import "./scss/main.scss";
import $ from "jquery";
import { YtSearch } from "./youtube-search-service";
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
let db = firebase.firestore();
let dbTest = db.collection("test");
// firebase Auth
let loginUI = new firebaseui.auth.AuthUI(firebase.auth());
let ytSearch = new YtSearch();

$(document).ready(function() {
  let userID;

  //Login condition
  firebase.auth().onAuthStateChanged(function(user) {
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
    let input1 = $("#input-1").val();
    let input2 = $("#input-2").val();

    const testObj = {
      input1: input1,
      input2: input2
    };

    
    (async ()=> {
      const response = await ytSearch.getSongByTitle(input1);
      console.log(response);
      if (response.items.length > 0) {
        response.items.forEach(function(item) {
          
          $(".output").html(item.snippet.title);
        })
      }
    })

    //write to database
    dbTest
      .add(testObj)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }); //end Document ready

  //print to DOM from database
  // dbTest.onSnapshot((querySnapshot) => {
  //   let printString = "";
  //   querySnapshot.forEach((item) => {
  //     printString += `<div class="card">
  //       <div class="text-center" >Doc ID: ${item.id} </div> 
  //       <div class="text-center" >${item.data().input1} | ${item.data().input2} </div> 
  //     </div>`;
  //   });
  //   $(".output").html(printString);
  // });
});
