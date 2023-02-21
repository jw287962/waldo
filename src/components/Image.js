import React, {useEffect,useState}from "react";
import "../Image.css"
import Dropdown from './Dropdown';
import {addCharacterPosition, initializeFireStoreApp} from './fireStoreMethod';


function importAll(img){
  let object = [];
  let allImages = img.keys().map(img);

  img.keys().forEach((element,i) => {
    let imageName = element.substring(2,element.substring(2).indexOf('.')+2);
    imageName = imageName.substring(0,1).toUpperCase() + imageName.substring(1);
    let imageFile = allImages[i];
    object.push({imageName,imageFile});
    i++;
  });
  return object;
}
initializeFireStoreApp();



  const allPictures = importAll(require.context('../assets',false,/\.(png|jpe?g|svg|gif)$/));

  function roundMath(math) {
  
    return Math.round(math);
  }


const Image = () => {

  
  const [posX,setPosX] = useState(0);
  const [posY,setPosY] = useState(0);
  const [toggleDrop,setToggleDrop] = useState(true);


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

      const imageName1 = "waldo"
    addCharacterPosition(odlawPosition,imageName1,'images','odlaw');
    };
    

image.addEventListener('click', imageClicked);

    function imageClicked(e) {
      const toggle = !toggleDrop
      const dropdown = document.querySelector('.dropdown')
      dropdown.classList.toggle('hidden');
      setToggleDrop(toggle);
        setPosX(e.pageX);
        console.log(posX)
        setPosY(e.pageY);
    }
    return function cleanup() {
      image.removeEventListener('click', imageClicked);
    };

  },[])

  useEffect(() => {
    console.log('testing multiple useeffect? hmm')
  })


  return (
    <div>
      <img src={allPictures[0].imageFile} alt="where" ></img>
      <Dropdown posX = {posX} posY = {posY} imageID="waldo"></Dropdown>
      </div>
 
    )
}

export default Image;