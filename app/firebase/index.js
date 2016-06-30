import firebase from 'firebase';

try {
    console.log(process.env.API_KEY);
    var config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        storageBucket: process.env.STORAGE_BUCKET
    };

    firebase.initializeApp(config);
} catch (e) {
    console.log('Error with Firebase: ', e);
}

export var firebaseRef = firebase.database().ref();

export default firebase;
