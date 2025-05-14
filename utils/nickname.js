import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function setUserAlias(uid, alias) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { alias });
}
