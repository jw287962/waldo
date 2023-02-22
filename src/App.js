import './App.css';
import React, {useState,useEffect} from 'react';
import Nav from './components/Nav';
import Image from './components/Image';

// import { initializeApp } from "firebase/app";
import {addCharacterPosition, initializeFireStoreApp} from './components/fireStoreMethod';

const App = () => {


  return (
    <div className="App">
        <Image></Image>
    </div>
  );
}

export default App;
