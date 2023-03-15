import { db } from "./config"

const database = db.ref("/users")


class users {
    getUser(currentUser) {
        return database.orderByChild(currentUser);
    }

    // create(tutorial) {
    //     return database.push(tutorial);
    // }

    // update(key, value) {
    //     return database.child(key).update(value);
    // }

    // delete(key) {
    //     return database.child(key).remove();
    // }

    // deleteAll() {
    //     return database.remove();
    // }
}
export default new users()