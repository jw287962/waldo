import './App.css';
import React, {useState,useEffect} from 'react';
import Nav from './components/Nav';
import Image from './components/Image';
import { initializeApp } from "firebase/app";


const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDwnotClaPasS5jB3Qb9zoLXT5Tbjag9o4",
    authDomain: "waldo-d61a6.firebaseapp.com",
    projectId: "waldo-d61a6",
    storageBucket: "waldo-d61a6.appspot.com",
    messagingSenderId: "223196428111",
    appId: "1:223196428111:web:d1a41335026c2d7e4ab73a"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  return (
    <div className="App">
        <Nav></Nav>
        <Image></Image>
    </div>
  );
}

export default App;
