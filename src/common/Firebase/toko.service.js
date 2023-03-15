import { db } from "./config";
import {
	child,
	get,
	orderByChild,
	query,
	push,
	ref,
	update,
} from "firebase/database";

const refer = "/toko/";
const database = ref(db, refer);
const customRef = (data) => {
	return ref(db, refer + "/" + data);
};

class toko {
	getToko(currentUser) {
		return query(database, orderByChild(currentUser));
	}
	getTokoSpesific(currentUser) {
		return get(child(customRef(currentUser)));
	}


	create() {
		return push(child(database)).key;
	}

	update(key, value) {
		const updates = {};
		updates[database + key] = value;
		return update(ref(db), updates);
	}

	// delete(key) {
	// 	return database.child(key).remove();
	// }

	// deleteAll() {
	// 	return database.remove();
	// }
}
export default new toko();
