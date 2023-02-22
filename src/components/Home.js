import React, {useEffect,useState}from "react";
import { Link } from "react-router-dom";

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

const Home = () => {



  const allPictures = importAll(require.context('../assets',false,/\.(png|jpe?g|svg|gif)$/));
  console.log(allPictures);

  return (
    <div className="select">
            {allPictures.map(ele => {
              return (
                <Link to={{pathname:"/App" }} state={{image: ele}}> <img src={ele.imageFile} alt={ele.imageName} className="imgSelect">
             
                </img></Link> 
              )
            })}

           {/* <Link to={{pathname:"/App" }} state={{image: allPictures[0]}}> <img src={allPictures[0].imageFile} alt={allPictures[0].imageName} className="imgSelect">
             
             </img></Link>  */}
            
         
           
    </div>
  );
};

export default Home;