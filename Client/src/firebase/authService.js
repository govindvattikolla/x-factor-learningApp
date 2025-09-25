
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebaseConfig';  // Import the Firebase auth and db from the config file
import { doc, setDoc, getDoc } from "firebase/firestore";

// Sign up user
export const signUpUser = async (email, password, name, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user data like name and role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      role,
    });
    return user;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

// Log in user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Get user role from Firestore
export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      throw new Error("No role found");
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};
