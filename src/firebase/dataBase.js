import firebase from 'firebase';
import 'firebase/database';

const DB_CONFIG = {
	apiKey: "AIzaSyAW181zg1EcPh0avxvF-FERZ_DzLWZZZcY",
  authDomain: "shogi-4e22a.firebaseapp.com",
  databaseURL: "https://shogi-4e22a.firebaseio.com",
  projectId: "shogi-4e22a",
  storageBucket: "shogi-4e22a.appspot.com",
  messagingSenderId: "359891035623"
};

firebase.initializeApp(DB_CONFIG);
let database = firebase.database();

const addData = (data) => {
	data = JSON.stringify(data);
	return new Promise((resolve, reject) => {
		let ref = database.ref('/boardState');
		if(ref) {
			resolve(ref.set(data));
		} else {
			reject(console.log('add data failed'));
		}
	})
};

export { database, addData };