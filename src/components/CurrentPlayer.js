import React from "react";

class CurrentPlayer extends React.Component {
    render(){
        return(
            <p className="current-player">Esperando jugada de <span style={{"font-size":"1.5rem"}}>{this.props.isPlayerOne?"O":"X"}</span></p>
        );
    }
};

export default CurrentPlayer;
