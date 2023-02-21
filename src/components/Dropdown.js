import React, {useEffect,useState} from "react";
import {
  getFirestore,
  collection,
  addDoc,getDoc,
  query,
  orderBy,startAt,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

import { initializeFireStoreApp,getFireStoreData } from "./fireStoreMethod";

const Dropdown = (props) => {
  console.log(props, 'empty');

  const [imageID,setImageID] = useState(props.imageID);
  const [clickedWaldo,setClickedWaldo] = useState(false);
  const [imageData,setImageData] = useState(undefined);

  initializeFireStoreApp();

  const {posX,posY} = props;
  useEffect(()=> {
    console.log('dropdown');
   const dropdown = document.querySelector('.dropdown')


   dropdown.style.left = `${posX}px`;
   dropdown.style.top = `${posY}px`;
   if(imageID && imageID !== props.imageID){
    console.log('update Image Data')
    setImageData(getFireStoreData(imageID));

   }

  },)

  useEffect(()=> {
  
   if(imageID){
    getFireStoreData(imageID).then((response) => response)
    .then((data) => setImageData(data));
   }
  },[])

  const clickedButton = (e) => {
    const dropdown = document.querySelector('.dropdown')
    dropdown.classList.toggle('hidden');
    let isInBox = false;;

console.log(imageData);
const positions = imageData.boxPosition.mapValue.fields
console.log(positions);

const boxCoord = [];
console.log(boxCoord);

console.log(posX);
// between bottomL and bottomR's X numbers
// Y should be between bottomL and Left's y  and between bottomRight and Right's Y
console.log(positions.bottomL.arrayValue.values[0].integerValue*1);
if(posX >= positions.bottomL.arrayValue.values[0].integerValue*1 && posX<= positions.bottomR.arrayValue.values[0].integerValue*1 
  // && posX >= positions.left.arrayValue.values[0]*1 && posX <= positions.right.arrayValue.values[0]*1
  // && posY <= positions.bottomL.arrayValue.values[1]*1 && posY >= positions.left.arrayValue.values[1]*1
  && posY <= positions.bottomR.arrayValue.values[1].integerValue*1 && posY >= positions.right.arrayValue.values[1].integerValue*1
  && e.target.textContent.toLowerCase() === imageData.personName.stringValue){
  console.log('checking correct person data');

    console.log('correct positon for Odlaw for now!!!!!!!!!!!!')
  }



}

// const isMatch = positions.map(ele => console.log(ele)) 
// Check person button click is same and coincides with person position


  return (
    <div className="col dropdown hidden" >
        <button onClick={clickedButton}>Waldo</button>
        <button onClick={clickedButton}>Odlaw</button>
        <button onClick={clickedButton} className="outer">...</button>
    </div>
  )
}

export default Dropdown;