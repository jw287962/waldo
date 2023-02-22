import './App.css';
import React, {useState,useEffect} from 'react';
import Nav from './components/Nav';
import Image from './components/Image';
import {useLocation} from "react-router-dom";

// import { initializeApp } from "firebase/app";
import {addCharacterPosition, initializeFireStoreApp} from './components/fireStoreMethod';

const App = (props) => {
  
  let { state } = useLocation();
  const [image,setImage] = useState([]);

  useEffect(()=>{
    if( state && image !== state.image ){
      setImage(state.image);
    }
    if(!image && state){
      setImage(state.image);
    }    
  })

  return (
    <div className="App">
        <Image image={state.image}></Image>
    </div>
  );
}

export default App;
