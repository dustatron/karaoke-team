# _Firebase Cheatsheet_
#### _Useful links _
* [Firebase Firestore Video Tutorial Playlist](https://www.youtube.com/playlist?list=PLl-K7zZEsYLluG5MCVEzXAQ7ACZBCuZgZ&app=desktop)
* [Firebase quick howto guides](https://cloud.google.com/firestore/docs/how-to)
* [A Cheatsheet gist](https://gist.github.com/victorbruce/0e6845010e7c4b24ddbccbe58094c57f)

# Cloud Firestore

**To use firebase cloud firestore, first you'll need to import firestore from firebase.**

```js
  import firestore from 'firebase/firestore';
```
- Connect to a collection:

```js
  firestore.collection('rooms'); // returns a collection reference called rooms
```

- Connect to a document:

```js
  firestore.doc(`/rooms/id`); // returns a specific document refercence 
```

## Performing CRUD operations in Cloud Firestore

- Create (add) a new document with auto-generated ID

```js
  let db = [ref to firebase db]
  db.collection("rooms").add({
    name: "dirty-shoes",
    country: "Japan"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
  
  // Alternatively
  firestore.collection('rooms').set(data);
  
```
**Note: set also creates a new document if the documents being set does not exist **

- **Get (read) all documents** with live reload:

```js
  let db = firestore.collection('rooms');

   db.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((item) => {
      console.log(item.data()); // shows properties of doc
      console.log(item.id); //shows id of doc
    });
  });
```
**Note: '.data()' is how you access the properties of a document **
**Note: '.onSnapshot' is what enables live reloading when the database updates **
- **Get all Documents from a collection**
```js
db.collection("rooms").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

```
- **Get a single document** from a collection: 

```js
  
  const roomRef = firestore.doc(`/rooms/id`);
  roomRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  
```

- **Get an item based on a property**
```js
db.collection("rooms").where("userID", "==", [userID here]])
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
```
*** Notes: [where documentation](https://cloud.google.com/firestore/docs/query-data/queries)

- **Update a specific document** in a collection:

```js
  firestore.doc(`/rooms/id`).update(data);  // returns a promise
  
  // Alternatively
  firestore.collection('roomss').doc('id').update(data, {merge: true})
```

- **Get a subcollection** of a document: 
```js
db.collection("rooms").doc([docID]).collection("playlist").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});
```

- **Ordering by**
```js
let roomsRef = firestore.collection('rooms');
roomsRef.orderBy("name").limit(3);

roomsRef.where("population", ">", 100000).orderBy("population").limit(2);
```



- **Delete a doc**
```js
db.collection("cities").doc("DC").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
```

**Note: updating a document without {merge: true} overwrites the entire document. But if {merge:true} is specified, prevents the entire document from being overwritten**

**Also, there are two ways of updating/modifying a document in firebase. We have the update and set methods. Set is used to wipe out the entire properties of a document reference whiles the update method updates/modifies just a single propety and will not wipe out the entire object **

- **Delete a specific document** in a collection:

```js
  firestore.doc(`/books/id`).delete(); // returns a promise
```

