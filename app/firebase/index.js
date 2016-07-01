import firebase from 'firebase';

try {
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

// This is needed to authenticate using social media
export var githubProvider = new firebase.auth.GithubAuthProvider;
export var firebaseRef = firebase.database().ref();

export default firebase;
