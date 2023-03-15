import { db } from "./config";
import {ref} from "firebase/database";

const refer = "/toko";
const database = ref(db, refer);
const customRef = (data) => {
    return db.ref(refer + "/" + data);
};

class toko {
    getToko(currentUser) {
        return database.child(currentUser);
    }

    create(antrian) {
        return database.push(antrian);
    }

    update(key, value) {
        return customRef(key).update(
            value
        );
    }

    delete(key) {
        return database.child(key).remove();
    }

    deleteAll() {
        return database.remove();
    }
}
export default new toko();