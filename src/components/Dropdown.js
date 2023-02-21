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
    let isInBox = false;;
console.log(e.target.textContent);
console.log(imageData);
const positions = imageData.boxPosition.mapValue.fields
console.log(positions);
for (const key1 in positions) {
      console.log(positions[key1].arrayValue.values);
    const dataPoints = positions[key1].arrayValue.values;
    dataPoints.forEach(element => {
      switch(key1) {
        case 'bottomL': 
        
            break;


        case 'bottomR':

      }
      console.log(element.integerValue);
    });

 
}
// const isMatch = positions.map(ele => console.log(ele)) 
// Check person button click is same and coincides with person position

if(imageData.personName.stringValue === e.target.textContent) {

}

  }

  return (
    <div className="col dropdown hidden" >
        <button onClick={clickedButton}>Waldo</button>
        <button onClick={clickedButton}>Odlaw</button>
    </div>
  )
}

export default Dropdown;