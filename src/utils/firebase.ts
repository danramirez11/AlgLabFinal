import { firebaseConfig } from "./firebaseconfig";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, orderBy, query } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addPost = async (post: any) => {
  try{
        const postWithTimestamp = {
          ...post,
          createdAt: serverTimestamp(),
      };
      const where = collection(db, "lab");
      await addDoc(where, postWithTimestamp);
  } catch (error) {
      console.error(error)
  }
}

export const getPost = async () => {

  const q = query((collection(db, "lab")), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  const transformed: any = [];

  querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      transformed.push({id: doc.id, ...data})
  });

  return transformed;
}


export default {
  addPost, getPost
}