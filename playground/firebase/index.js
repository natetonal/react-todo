import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA_LMe-xU-f4gjjbIg9OqhkZK55aKImL5I",
    authDomain: "nates-todo-app.firebaseapp.com",
    databaseURL: "https://nates-todo-app.firebaseio.com",
    storageBucket: "nates-todo-app.appspot.com",
};

firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
    app: {
        name: 'Todo App',
        version: '0.0.1'
   },
   isRunning: true,
   eatsPeople: false,
   user: {
       name: 'Nate',
       age: 31
   }
});

var todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => {
    console.log('New todo added: ', snapshot.key, snapshot.val());
});

todosRef.push({
    text: 'Eat delicious cakes',
    createdAt: 1245,
    completed: false,
    completedAt: ''
});

todosRef.push({
    text: 'Urinate on cats',
    createdAt: 1125,
    completed: false,
    completedAt: ''
});

// // New properties on the object can be created like this:
// var notesRef = firebaseRef.child('notes');
//
// // These are event listeners for children:
// notesRef.on('child_added', (snapshot) => {
//     console.log('child added', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_changed', (snapshot) => {
//     console.log('child changed', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_removed', (snapshot) => {
//     console.log('child removed', snapshot.key, snapshot.val());
// });
// // This is the same as notesRef.push().set({}):
// var newNoteRef = notesRef.push({
//     text: 'walk the dog!!'
// });
//
// console.log('New note ref ID: ', newNoteRef.key);

// firebaseRef.child('user').on('value', (snapshot) => {
//     console.log('user value: ', snapshot.val());
// });
//
// firebaseRef.child('user').update({
//     name: 'Emily'
// });
//
// firebaseRef.child('app').update({
//     name: 'Todo Application'
// });

// 'on' listens for changes in the database and invokes a callback function on each change:
// firebaseRef.on('value', (snapshot) => {
//     console.log('Got value ', snapshot.val());
// });
//
// // 'off' turns off all event listeners:
// firebaseRef.off();

// listener functions can be stored to variables and passed to on or off to specify which listener to toggle:
// var thisListener = (snapshot) => {
//     console.log('Got value ', snapshot.val());
// };
//
// firebaseRef.on('value', thisListener);
//
// firebaseRef.update({
//     eatsPeople: true,
// });
//
// firebaseRef.off('value', thisListener);
//
// firebaseRef.update({
//     isRunning: false
// });

// Fetch a child:
// firebaseRef.child('app').once('value').then((snapshot) => {
//     console.log('Got app ', snapshot.key, snapshot.val());
// }, (err) => {
//     console.log('Unable to fetch object ', err);
// });

// Fetch entire database:
// firebaseRef.once('value').then((snapshot) => {
//     console.log('Got entire database ', snapshot.val());
// }, (err) => {
//     console.log('Unable to fetch object ', err);
// });

// Update & Remove:
// firebaseRef.child('app').update({
//     name: 'Todo Application',
// });
//
// firebaseRef.child('user').update({
//     name: 'Hitomi'
// });
//
// firebaseRef.child('user').update({
//     name: 'Emily',
//     age: null
// });
//
// firebaseRef.child('isRunning').remove();

// Wipes the whole database:
// firebaseRef.remove();
// Removes app.name:
// firebaseRef.child('app/name').remove();

// properties can be set to null in update to wipe from the database, as well:
// firebaseRef.child('app').update({
//     version: '0.0.2',
//     name: null
// });

// Use Multipath strings to update nested objects:
// firebaseRef.update({
//     isRunning: false,
//     'app/name': 'Todo Application'
// });

// This does the same thing as the multipath update, leaving version untouched:
// firebaseRef.child('app').update({
//     name: 'Todo Application'
// }).then(() =>{
//     console.log('Update succesful!');
// }, (error) => {
//     console.log('Update failed: ', error);
// });

// // Set "sets" data to the reference, but it also wipes whatever was previously there
// firebaseRef.set({
//     app: {
//          name: 'Todo App',
//          version: '0.0.1'
//     },
//     isRunning: true,
//     user: {
//         name: 'Nate',
//         age: 31
//     }
// }).then(() => {
//     console.log('Set was successful!');
// }, (e) => {
//     console.log('Set didnt work out');
// });
//
// // firebaseRef.set({
// //     appName: 'Todo Application'
// // });
//
//
// // firebaseRef.child('user').set({
// //     name: 'Hitomi'
// // });
//
// firebaseRef.child('app').set({
//     name: 'Todo Application'
// });
