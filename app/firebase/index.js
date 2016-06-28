import firebase from 'firebase';

try {
    var config = {
        apiKey: "AIzaSyA_LMe-xU-f4gjjbIg9OqhkZK55aKImL5I",
        authDomain: "nates-todo-app.firebaseapp.com",
        databaseURL: "https://nates-todo-app.firebaseio.com",
        storageBucket: "nates-todo-app.appspot.com",
    };
    firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();

export default firebase;
