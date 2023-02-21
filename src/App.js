import './App.css';
import React, {useState,useEffect} from 'react';
import Nav from './components/Nav';
import Image from './components/Image';

// import { initializeApp } from "firebase/app";
import {addCharacterPosition, initializeFireStoreApp} from './components/fireStoreMethod';

const App = () => {

initializeFireStoreApp();

//   const firebaseConfig = {
//     apiKey: "AIzaSyDwnotClaPasS5jB3Qb9zoLXT5Tbjag9o4",
//     authDomain: "waldo-d61a6.firebaseapp.com",
//     projectId: "waldo-d61a6",
//     storageBucket: "waldo-d61a6.appspot.com",
//     messagingSenderId: "223196428111",
//     appId: "1:223196428111:web:d1a41335026c2d7e4ab73a"
//   };
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);


const odlawPosition ={
  left: [311,437], right: [313,500], bottomL: [330,436], bottomR: [322,501],
}
const imageName1 = "where's waldo"
addCharacterPosition(odlawPosition,imageName1,'images','odlaw');


  
  


  return (
    <div className="App">
        <Nav></Nav>
        <Image></Image>
    </div>
  );
}

export default App;
