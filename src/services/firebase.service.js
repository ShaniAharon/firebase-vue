import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDoc, doc, getDocs, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";

export const firebaseService = {
    query,
    getEntityById,
    saveEntity,
    removeEntity,
}
// console.log('process.env.VITE_SOME_KEY', import.meta.env);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


async function query(collectionName) {
    try {
        const tasksSnapshot = await getDocs(collection(db, collectionName))
        console.log('tasksSnapshot', tasksSnapshot)
        return tasksSnapshot.docs.map((doc) => {
            return { _id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate() || new Date() }
        })
    } catch (e) {
        console.error("Error geting documents: ", e);
    }
}

async function getEntityById(collectionName, entityId) {
    const docRef = doc(db, collectionName, entityId)
    try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return { _id: entityId, ...docSnap.data() }
        } else {
            console.log('No such document!')
        }
    } catch (e) {
        console.error("Error finding document: ", e);
    }
}

async function saveEntity(collectionName, entity) {
    if (entity._id) {
        const entityRef = doc(db, collectionName, entity._id)
        delete entity._id
        try {
            await updateDoc(entityRef, entity)
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    } else {
        try {
            await addDoc(collection(db, collectionName), {
                ...entity,
                createdAt: serverTimestamp(),
            })
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    }
}

async function removeEntity(collectionName, entityId) {
    try {
        await deleteDoc(doc(db, collectionName, entityId))
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}