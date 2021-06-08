import './App.css';
import React from 'react';
import Movements from './components/Movements';
import ButtonRow from './components/ButtonRow';

class App extends React.Component {
  state = {
    isPlayerOne:true,
    isFinished:false,
    grid:[
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    plays:[],
    winner:""
  };

  resetGame = () =>{
    this.setState((state)=>{
      return {
        isFinished:!state.isFinished,
        plays:[],
        grid:[
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
        winner:""
      }
    });
  };
  goBack = (goTo) =>{
    //tengo que rescribir jugadas y grilla
    let pastGrid = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    if (goTo>=1){
      const previousPlays = this.state.plays.slice(0, goTo);

      previousPlays.forEach(play=>{
        pastGrid[play.xCoord][play.yCoord] = play.who;
      })
      
      this.setState((state)=>{
        return {
          plays: previousPlays,
          grid: pastGrid,
          isFinished: state.isFinished?!state.isFinished:state.isFinished, //esto es por si quiero ir al pasado desde un juego terminado
          winner: "",
          isPlayerOne: previousPlays[previousPlays.length-1].who==="O"?false:true
        };
      });
    }
  };

  checkGridRows = (grid) =>{
    let oneWin = false;
    let xCoord = 0;
    let yCoord = 0;
    if(grid[0][0]===grid[0][1] && grid[0][1]===grid[0][2] && grid[0][0]!==0){
      oneWin=true;
    }else if(grid[1][0]===grid[1][1] && grid[1][1]===grid[1][2] && grid[1][0]!==0){
      oneWin=true;
      xCoord = 1;
    } else if(grid[2][0]===grid[2][1] && grid[2][1]===grid[2][2] && grid[2][0]!==0){
      oneWin=true;
      xCoord = 2;
    }
    if (oneWin){
      this.setState((state)=>{
        return {
          isFinished:!state.isFinished,
          winner:grid[xCoord][yCoord]
        };
      })
    }
  };
  checkGridColumns = (grid) =>{
    let oneWin = false;
    let xCoord = 0;
    let yCoord = 0;
    if(grid[0][0]===grid[1][0] && grid[1][0]===grid[2][0] && grid[0][0]!==0){
      oneWin=true;
    }else if(grid[0][1]===grid[1][1] && grid[1][1]===grid[2][1] && grid[0][1]!==0){
      oneWin=true;
      yCoord = 1;
    } else if(grid[0][2]===grid[1][2] && grid[1][2]===grid[2][2] && grid[0][2]!==0){
      oneWin=true;
      yCoord = 2;
    }
    if (oneWin){
      this.setState((state)=>{
        return {
          isFinished:!state.isFinished,
          winner:grid[xCoord][yCoord]
        };
      });
    }
  };
  checkGridDiagonals = (grid) =>{
    let oneWin = false;
    let xCoord = 0;
    let yCoord = 0;
    if(grid[0][0]===grid[1][1] && grid[1][1]===grid[2][2] && grid[0][0]!==0){
      oneWin=true;
    }else if(grid[2][0]===grid[1][1] && grid[1][1]===grid[0][2] && grid[2][0]!==0){
      oneWin=true;
      xCoord=2;
      //yCoord=0;
    }
    if (oneWin){
      this.setState((state)=>{
        return {
          isFinished:!state.isFinished,
          winner: grid[xCoord][yCoord]
        };
      });
    }
  };
  
  playHandler = (event) =>{
    
    const loc = event.target.value.split(",");
    
    const xCoord = parseInt(loc[0]); 
    const yCoord = parseInt(loc[1]);
    const who = this.state.isPlayerOne? "O":"X";
    const grid = [...this.state.grid];
    grid[xCoord][yCoord]=who;

    this.setState((state)=>{
      return {
        isPlayerOne:!state.isPlayerOne,
        plays:[...state.plays, {xCoord,yCoord,who}],
        grid
      };
    });
    //event.target.disabled = true;

    /* event.target.innerHTML = this.state.isPlayerOne? "O":"X"; forma vieja de marcar boton*/

    if (this.state.plays.length>=4){
      /* si no pasa nada en un checkeo, no cambia estado y se corre el proximo checkeo. 
      Si aplica uno, cambia el estado y re-renderiza.
      Ahi contrastaria para saber si termino el juego */
      this.checkGridDiagonals(grid);
      this.checkGridColumns(grid);
      this.checkGridRows(grid);
      //this.callWinner(who);//esto corre siempre, tiene que correr solo cuando hay una victoria, lo meto adentro de los checkeos 
    }
  };

  render(){
    const winnerJSX = (
      <div>
        <h2>Felicitaciones {this.state.winner}!</h2>
        <button onClick={this.resetGame} className="reset-btn">Reset game <i class="fas fa-sync-alt"></i></button>
      </div>
    );
    return(
      <div>
        <h3 className="page-title">Area de juego</h3>
        {this.state.isFinished && winnerJSX}
        <div className="row">
          <div className="col-md-6">
            <ButtonRow rowIndex={0} row={this.state.grid[0]} isFinished={this.state.isFinished} playHandler={this.playHandler}/>
            <ButtonRow rowIndex={1} row={this.state.grid[1]} isFinished={this.state.isFinished} playHandler={this.playHandler}/>
            <ButtonRow rowIndex={2} row={this.state.grid[2]} isFinished={this.state.isFinished} playHandler={this.playHandler}/>
          </div>
          <Movements className="col-md-6" plays={this.state.plays} goBack={this.goBack}/>
        </div>
        
      </div>
      
    );
  }
}

export default App;
