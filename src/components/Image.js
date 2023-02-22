import React, {useEffect,useState}from "react";
import "../Image.css"
import Dropdown from './Dropdown';
import {addCharacterPosition, initializeFireStoreApp} from './fireStoreMethod';



initializeFireStoreApp();



  function roundMath(math) {
  
    return Math.round(math);
  }


const Image = (props) => {
  // console.log(props);
  const d = new Date();
  let startTimer = d.getTime();
    const [currentImage] = useState(props.image); 
  const [posX,setPosX] = useState(0);
  const [posY,setPosY] = useState(0);
  const [toggleDrop,setToggleDrop] = useState(true);
  const [imageWidth,setImageWidth] = useState(undefined);
  const [imageSizeChanged,setImageSizeChanged] = useState(false);

  const [imageHeight,setImageHeight] = useState(undefined);


  const [timer,setTimer] = useState(0);

const [startTime] = useState(startTimer);



  setInterval(function() {
    var delta = Date.now() - startTime; // milliseconds elapsed since start
  
    const output = Math.floor(delta / 1000); // in seconds
    // alternatively just show wall clock time:
    setTimer(new Date(output * 1000).toISOString().substring(11, 19));
}, 10000); 

  useEffect(()=> {
    const image = document.querySelector('img');

    image.onload = function() {
    console.log(image.width, 'width'    , image.height , 'height')
    const imageHeight = image.height;    //+58
    const imageWidth = image.width/0.95;  //  /0.95

      const odlawPosition ={
        bottomL: [roundMath(0.272*imageWidth),roundMath(0.555*imageHeight)+58], bottomR: [roundMath(0.291*imageWidth),roundMath(0.555*imageHeight)+58], 
        left: [roundMath(0.272*imageWidth),roundMath(0.471*imageHeight)+58], right: [roundMath(0.291*imageWidth),roundMath(0.471*imageHeight)+58],
      }
      const waldoPosition ={
        bottomL: [roundMath(0.544*imageWidth),roundMath(0.555*imageHeight)+58], bottomR: [roundMath(0.572*imageWidth),roundMath(0.555*imageHeight)+58], 
        left: [roundMath(0.544*imageWidth),roundMath(0.5*imageHeight)+58], right: [roundMath(0.572*imageWidth),roundMath(0.5*imageHeight)+58],
      }
    addCharacterPosition(odlawPosition,'odlaw',currentImage.imageName,'odlaw');
    addCharacterPosition(waldoPosition,'waldo',currentImage.imageName,'waldo');
    setImageWidth(image.width/0.95);
    setImageHeight(image.height);
    };
    

image.addEventListener('click', imageClicked);

    function imageClicked(e) {
      console.log('clicked image')
      const toggle = !toggleDrop
      const dropdown = document.querySelector('.dropdown')
      dropdown.classList.toggle('hidden');
        console.log('imagesizechanged', imageSizeChanged)
      if(imageSizeChanged){
        console.log(
          'CHANGED BACK TO FALSE!!!'
        )
        setImageSizeChanged(!imageSizeChanged);
      }
      setToggleDrop(toggle);
        setPosX(e.pageX);
        console.log(posX)
        setPosY(e.pageY);
      
    }
    return function cleanup() {
      image.removeEventListener('click', imageClicked);
    };
  },[])
// useEffect(() => {
  
// },)
  useEffect(() => {
    const image = document.querySelector('img');
    setImageSizeChanged(true);

    if(imageSizeChanged){
console.log('NO ENTER FIRST')
      console.log('size changed set to true')
    console.log(imageSizeChanged);

      const imageHeight = image.height;    //+58
      const imageWidth = image.width/0.95;  //  /0.95
      const odlawPosition ={
        bottomL: [roundMath(0.272*imageWidth),roundMath(0.555*imageHeight)+58], bottomR: [roundMath(0.291*imageWidth),roundMath(0.555*imageHeight)+58], 
        left: [roundMath(0.272*imageWidth),roundMath(0.471*imageHeight)+58], right: [roundMath(0.291*imageWidth),roundMath(0.471*imageHeight)+58],
      }
      const imageName1 = "waldo"
    addCharacterPosition(odlawPosition,imageName1,'images','odlaw');
    setImageWidth(image.width/0.95);  //  /0.95
    setImageHeight(image.height);
    
    }

    setImageSizeChanged(false);

    return function cleanup() {
     }

  },[imageSizeChanged])


  return (
    <div>
      <div>Timer: {timer}</div>
      <img src={currentImage.imageFile}  alt="where" ></img>
      <Dropdown posX = {posX} posY = {posY} imageID={currentImage.imageName} imageSizeChanged={imageSizeChanged}></Dropdown>
      </div>
 
    )
}

export default Image;