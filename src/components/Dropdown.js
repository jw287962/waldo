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

import { initializeFireStoreApp,getFireStoreData,getFireStoreCollection } from "./fireStoreMethod";

const Dropdown = (props) => {

  const [imageID,setImageID] = useState('waldo');
  const [clickedWaldo,setClickedWaldo] = useState(false);
  const [imageData,setImageData] = useState(undefined);  //this is the targetbox that we check with
  const [imageSizeChanged,setImageSizeChanged] = useState(props.imageSizeChanged);
  const [updatedImage, setUpdatedImage] = useState(true);
  const [objectsFound,setObjectsFound] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  initializeFireStoreApp();
  const {posX,posY} = props;

//   useEffect(() => {
//     getFireStoreData(imageID,'WhereisWaldo').then((response) => response)
//     .then((data) => setImageData(data));
// }, [imageID])

  useEffect(()=> {
   const dropdown = document.querySelector('.dropdown')
   dropdown.style.left = `${posX}px`;
   dropdown.style.top = `${posY}px`;
   console.log(posX,posY)
  //  if(imageSizeChanged && updatedImage ){
  //   getFireStoreCollection('WhereisWaldo').then((response) => response)
  //   .then((data) => setImageData(data));
  //   setUpdatedImage(false);
  //  }
   if(imageSizeChanged != props.imageSizeChanged){
    setImageSizeChanged(props.imageSizeChanged);
  }
  
  },)

  useEffect(()=> {
    if(objectsFound == 2){
      console.log('won');
      setHasWon(!hasWon);
      setFinalTime(props.timer);
    }
   
   },[objectsFound])

  useEffect(()=> {
      console.log('image size chnaged')
     getFireStoreCollection('WhereisWaldo').then((response) => response)
     .then((data) => setImageData(data));
     if(imageSizeChanged && updatedImage){
      setImageSizeChanged(false);
      setUpdatedImage(false);
     }
   },[imageSizeChanged,updatedImage])

  useEffect(()=> {
  
   if(imageID){
    getFireStoreCollection('WhereisWaldo').then((response) => response)
    .then((data) => setImageData(data));
   }

  },[])

  const clickedButton = (e) => {
   if(!updatedImage){
    setUpdatedImage(true);

   }
   console.log(imageID);
   if(imageID !== e.target.textContent.toLowerCase()){
    setImageID(e.target.textContent.toLowerCase())
   }
    const dropdown = document.querySelector('.dropdown')
    dropdown.classList.toggle('hidden');
    // console.log(imageData);
    let num = 0;
if(e.target.textContent === 'Waldo'){
  console.log('waldo is clicked')
  num = 1;
}if(e.target.textContent === 'Odlaw'){
  num = 0;
}
console.log(num);
const positions = imageData[num].boxPosition.mapValue.fields;
console.log(positions);

// between bottomL and bottomR's X numbers
// Y should be between bottomL and Left's y  and between bottomRight and Right's Y
if(posX >= positions.bottomL.arrayValue.values[0].integerValue*1 && posX<= positions.bottomR.arrayValue.values[0].integerValue*1 
  && posY <= positions.bottomR.arrayValue.values[1].integerValue*1 && posY >= positions.right.arrayValue.values[1].integerValue*1
  && e.target.textContent.toLowerCase() === imageData[num].personName.stringValue){
  console.log('checking correct person data');
    console.log('correct positon for Odlaw for now!!!!!!!!!!!!')
    console.log('___________________-')
   e.target.classList.add('hidden')
  setObjectsFound(objectsFound+1);
  }

}

// const isMatch = positions.map(ele => console.log(ele)) 
// Check person button click is same and coincides with person position


  return (

    <div>
      <div className={(!hasWon) ? "hidden": "winner"}>
          <div>
            YOUR TIME: {finalTime} You have found them all!
          </div> 

      </div>
      <div className="col dropdown hidden">
          <button onClick={clickedButton}>Waldo</button>
          <button onClick={clickedButton}>Odlaw</button>
          <button onClick={clickedButton} className="outer">...</button>
      </div>
    </div>
  )
}

export default Dropdown;