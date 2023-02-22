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

  const [imageID,setImageID] = useState(props.imageID);
  const [clickedWaldo,setClickedWaldo] = useState(false);
  const [imageData,setImageData] = useState(undefined);  //this is the targetbox that we check with
  const [imageSizeChanged,setImageSizeChanged] = useState(props.imageSizeChanged);
  const [updatedImage, setUpdatedImage] = useState(true);
  initializeFireStoreApp();
  const {posX,posY} = props;


  useEffect(()=> {
   const dropdown = document.querySelector('.dropdown')
   dropdown.style.left = `${posX}px`;
   dropdown.style.top = `${posY}px`;
   
    console.log('dropdown, ',imageSizeChanged)
    console.log(updatedImage, 'updatedImage is false?');
   if(imageSizeChanged && updatedImage){
    getFireStoreData(imageID).then((response) => response)
    .then((data) => setImageData(data));
    setUpdatedImage(false);
   }
   if(imageSizeChanged != props.imageSizeChanged){
    setImageSizeChanged(props.imageSizeChanged);
  }
  
  },)

  useEffect(()=> {
  
   if(imageID){
    getFireStoreData(imageID).then((response) => response)
    .then((data) => setImageData(data));

   }
   

  },[])

  const clickedButton = (e) => {
   if(!updatedImage){
    setUpdatedImage(true);

   }
    const dropdown = document.querySelector('.dropdown')
    dropdown.classList.toggle('hidden');

const positions = imageData.boxPosition.mapValue.fields

// between bottomL and bottomR's X numbers
// Y should be between bottomL and Left's y  and between bottomRight and Right's Y
if(posX >= positions.bottomL.arrayValue.values[0].integerValue*1 && posX<= positions.bottomR.arrayValue.values[0].integerValue*1 
  && posY <= positions.bottomR.arrayValue.values[1].integerValue*1 && posY >= positions.right.arrayValue.values[1].integerValue*1
  && e.target.textContent.toLowerCase() === imageData.personName.stringValue){
  console.log('checking correct person data');
    console.log('correct positon for Odlaw for now!!!!!!!!!!!!')
    console.log('___________________-')
   e.target.classList.add('hidden')

  }

}

// const isMatch = positions.map(ele => console.log(ele)) 
// Check person button click is same and coincides with person position


  return (
    <div className="col dropdown hidden">
        <button onClick={clickedButton}>Waldo</button>
        <button onClick={clickedButton}>Odlaw</button>
        <button onClick={clickedButton} className="outer">...</button>
    </div>
  )
}

export default Dropdown;