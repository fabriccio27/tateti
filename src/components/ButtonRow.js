import PlayButton from "./PlayButton";
import React from "react";

const ButtonRow = ({rowIndex, playHandler, isFinished, row}) =>{
    return(
        <div className="row">
            <PlayButton coords={`${rowIndex},0`} player={row[0]} playHandler={playHandler} isFinished={isFinished}/>
            <PlayButton coords={`${rowIndex},1`} player={row[1]} playHandler={playHandler} isFinished={isFinished}/>
            <PlayButton coords={`${rowIndex},2`} player={row[2]} playHandler={playHandler} isFinished={isFinished}/>
        </div>
    );
};

export default ButtonRow;