import React, {useEffect,useState}from "react";
import "../Image.css"
import Dropdown from './Dropdown';

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


  const allPictures = importAll(require.context('../assets',false,/\.(png|jpe?g|svg|gif)$/));




const Image = () => {

  
  const [posX,setPosX] = useState(0);
  const [posY,setPosY] = useState(0);
  const [toggleDrop,setToggleDrop] = useState(true);


  useEffect(()=> {
    const image = document.querySelector('img');
    image.addEventListener('click', imageClicked);

    function imageClicked(e) {
      const toggle = !toggleDrop
      const dropdown = document.querySelector('.dropdown')
      dropdown.classList.toggle('hidden');
      setToggleDrop(toggle);
        setPosX(e.clientX);
        setPosY(e.clientY);
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
      <Dropdown posX = {posX} posY = {posY} ></Dropdown>
      </div>
 
    )
}

export default Image;