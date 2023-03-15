import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = firebase.initializeApp({
	//Database Toko Asli
	apiKey: "AIzaSyDC9jhK21bF31MCdBFmmbwGprU4gD1p-v8",
	authDomain: "smartq-e2fa7.firebaseapp.com",
	databaseURL: "https://smartq-e2fa7.firebaseio.com",
	projectId: "smartq-e2fa7",
	storageBucket: "smartq-e2fa7.appspot.com",
	messagingSenderId: "720623481044",
	appId: "1:720623481044:web:4d2605873f909fa95b4b41",
	measurementId: "G-HZDSDQ28M8",

	//Database developers
	// apiKey: "AIzaSyAcxPjB-HUZBeyFJzgAQ7ocYIZRY6yqEDU",
	// authDomain: "dev-smartq.firebaseapp.com",
	// databaseURL: "https://dev-smartq-default-rtdb.asia-southeast1.firebasedatabase.app",
	// projectId: "dev-smartq",
	// storageBucket: "dev-smartq.appspot.com",
	// messagingSenderId: "21602646668",
	// appId: "1:21602646668:web:969ef2d0f4356b8c54d9a9",
});
export const auth = getAuth(firebaseConfig);
export var db = getDatabase(firebaseConfig);
export default firebaseConfig;
export const storage = getStorage(firebaseConfig);
