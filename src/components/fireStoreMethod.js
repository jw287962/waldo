import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,getDoc, getDocs,
  query, 
  orderBy,startAt,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwnotClaPasS5jB3Qb9zoLXT5Tbjag9o4",
  authDomain: "waldo-d61a6.firebaseapp.com",
  projectId: "waldo-d61a6",
  storageBucket: "waldo-d61a6.appspot.com",
  messagingSenderId: "223196428111",
  appId: "1:223196428111:web:d1a41335026c2d7e4ab73a"
};
// Initialize Firebase
initializeFireStoreApp();

function initializeFireStoreApp() {
  const app = initializeApp(firebaseConfig);
  return app;
}

async function addCharacterPosition(boxPositionArray,imageName,collectionName,personName) {
  // Add a new message entry to the Firebase database.
  try {
    await setDoc(doc(getFirestore(), `${collectionName}`,imageName), {
      personName: personName,
      boxPosition: boxPositionArray,
      timestamp: serverTimestamp()
    });
  }
  
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}


async function getFireStoreData(imageID,collectionName){
  const db = getFirestore();
  const imagesRef = collection(db , collectionName);
  const docSnap = await getDoc(doc(imagesRef, imageID));
  const fetchedData = docSnap._document.data.value.mapValue.fields;
  console.log(fetchedData);
  return fetchedData;
  
  
  const q = query(imagesRef);
  console.log(q);
}
async function getFireStoreCollection(collectionName){
  const db = getFirestore();
  const imagesRef = collection(db , collectionName);
  const docSnap = await getDocs(imagesRef);
  const arrayHolder = [];
  const fetchedData = docSnap.forEach((ele) => {
    arrayHolder.push(ele._document.data.value.mapValue.fields);
  })

  return arrayHolder;
 
}

export  {addCharacterPosition, initializeFireStoreApp,getFireStoreData, getFireStoreCollection};