import React, {useEffect} from "react";

const Dropdown = (props) => {

  console.log(props);
  const {posX,posY} = props;
  useEffect(()=> {
    console.log('dropdown');
   const dropdown = document.querySelector('.dropdown')


   dropdown.style.left = `${posX}px`;
   dropdown.style.top = `${posY}px`;
  },)


  return (
    <div className="col dropdown hidden" >
        <button>Waldo</button>
        <button>Guy</button>
    </div>
  )
}

export default Dropdown;