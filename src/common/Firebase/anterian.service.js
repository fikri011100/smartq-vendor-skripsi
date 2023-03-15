import { db } from "./config";
import {
	orderByChild,
	query,
	ref,
	get,
	child,
	push,
	update,
} from "firebase/database";

const refer = "/anterian";
const database = ref(db, refer);
const customRef = (data) => {
	return ref(db, refer + "/" + data);
};

class anterian {
	getAntrian(currentUser) {
		return query(database, orderByChild(currentUser));
	}
	getAntrianSpesific(currentUser) {
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
export default new anterian();
