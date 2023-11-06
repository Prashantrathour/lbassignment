
import React from 'react';
import './overlay.css'; 
const Overlay = ({ data, onClose }) => {
    console.log(data)
  if(data.cod!==200){
    return (
        <div className="overlay">
             <div className="overlay-content">   <button className="btn" onClick={onClose}>Close</button> <p>{data.message}</p></div>
          
         
        </div>
    )
  }

    return (
        <div className="overlay">
                <button onClick={onClose}>Close</button>
            <div className="overlay-content">
                <div>City: {data.name}</div>
                <div>Temperature: {data.main.temp}</div>
                <div>
                    Weather: {data.weather[0].main}, {data.weather[0].description}
                </div>
            </div>
        </div>
    );
};

export default Overlay;
