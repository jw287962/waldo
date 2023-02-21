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




const Image = () => {

  
  const [posX,setPosX] = useState(0);
  const [posY,setPosY] = useState(0);
  const [toggleDrop,setToggleDrop] = useState(true);


  useEffect(()=> {
    const image = document.querySelector('img');
      console.log(image.clientWidth, image.clientHeight);
    // console.log(image.width, 'width'    , image.height , 'height')
function roundMath(math) {
  return Math.round(math);
}
      const odlawPosition ={
        left: [roundMath(0.285*image.clientWidth),roundMath(0.534*image.clientHeight)], right: [roundMath(0.30103*image.clientWidth),roundMath(0.5384*image.clientHeight)], bottomL: [roundMath(0.2835*image.clientWidth),roundMath(0.6222*image.clientHeight)], bottomR: [roundMath(0.3*image.clientWidth),roundMath(0.6236*image.clientHeight)],
      }

     
const imageName1 = "waldo"
addCharacterPosition(odlawPosition,imageName1,'images','odlaw');
   

image.addEventListener('click', imageClicked);

    function imageClicked(e) {
      const toggle = !toggleDrop
      const dropdown = document.querySelector('.dropdown')
      dropdown.classList.toggle('hidden');
      setToggleDrop(toggle);
        setPosX(e.clientX);
        setPosY(e.clientY-20);
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