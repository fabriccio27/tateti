import React from "react";

const PlayButton = ({coords, playHandler, isFinished, player})=>{
    // si retrocedo tengo que deshabilita con otra manera ademas de isFinished,
    // asi cuando vuelvo al pasado no me queda bloqueado
    return(
        <button 
        onClick={(event)=> playHandler(event)} 
        value={coords} 
        className="clickable col-md-4" 
        /* player es un simbolo, si no tiene 0 en la grilla, deberia estar deshabilitado */
        disabled={isFinished || player!==0}>
            {player === 0? "":player}
        </button>
    )
};

export default PlayButton;


