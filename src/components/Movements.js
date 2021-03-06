import React from "react";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Movements=({plays,goBack})=>{
    return(
        <div className="col-md-6">
          {plays.length>0 && plays.map(play=>{
              return (
                <p key={`${play.xCoord},${play.yCoord}`}>
                    {plays.indexOf(play)+1}. Ir a jugada #{plays.indexOf(play)+1}
                    <button onClick={()=>{
                        goBack(plays.indexOf(play)+1)
                    }} className="goTo-btn"><FontAwesomeIcon icon={faArrowCircleLeft}/></button>
                </p>
              )
          })}
        </div>
    );
};

export default Movements;