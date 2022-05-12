// TODO: create seperate dev and prod files, this one will always be replaced in production.
//  You don't want users to have access to dev data

export const environment = {
  firebase: {
    projectId: 'nods-fdb6b',
    appId: '1:108027487592:web:e64e5d20e2a3f8b8cba2dd',
    databaseURL: 'https://nods-fdb6b-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'nods-fdb6b.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAwY_wFWL5pX8Aa3Qf0qiV5I9KsPPQzEcI',
    authDomain: 'nods-fdb6b.firebaseapp.com',
    messagingSenderId: '108027487592',
    measurementId: 'G-XJQZVGQS46',
  },
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyDjOT6a4zi4N0pKYz8Wpkv4wy1Ol62FbdA',
    authDomain: 'notesoriginal.firebaseapp.com',
    databaseURL: 'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'notesoriginal',
    storageBucket: 'notesoriginal.appspot.com',
    messagingSenderId: '640937932701',
    appId: '1:640937932701:web:5481a41e42b7ad470a2174',
    measurementId: 'G-S34G9QYSYS'
  }
};
