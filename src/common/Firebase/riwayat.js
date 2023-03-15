import { db } from "./config";
import {ref} from "firebase/database";

const database = ref(db, "/anterian");

class riwayat {
    getAntrian(currentUser) {
        return database.orderByValue(currentUser);
    }

    create(tutorial) {
        return database.push(tutorial);
    }

    update(key, value) {
        return database.child(key).update(value);
    }

    delete(key) {
        return database.child(key).remove();
    }

    deleteAll() {
        return database.remove();
    }
}
export default new riwayat();