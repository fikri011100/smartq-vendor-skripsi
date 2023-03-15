import { db } from "./config";
import { ref } from "firebase/database";

const refer = "/anterian";
const database = ref(db, refer);
const customRef = (data) => {
	return db.ref(refer + "/" + data);
};

class riwayat {
	getAntrian(currentUser) {
		return database.orderByChild(currentUser);
	}
	getAntrianSpesific(currentUser) {
		return database.child(currentUser);
	}
	create() {
		return database.push();
	}
	update(key, value) {
		return customRef(key).update(value);
	}
	setSpesifik(key, value) {
		return customRef(key).set(value);
	}

	delete(key) {
		return database.child(key).remove();
	}

	deleteAll() {
		return database.remove();
	}
}
export default new riwayat();
