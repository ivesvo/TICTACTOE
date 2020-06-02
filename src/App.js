import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import './fonts/Mixo.ttf'
import Container from 'react-bootstrap/Container'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      // history: [{
        squares: Array(9).fill(null),
      // }],
      isXNext: true, // if its true then X , false then O 
      gameOver: false

    };
  }
  setTheState = (obj) =>{
    this.setState(obj);
  };

  timeTravel = (id)=> {
    console.log("b2b", id)
    

  }
  render() {
    return (
      <div>
        <div>
        <h1>¯\_(ツ)_/¯  CAMEL VS DINOSAURS ¯\_(ツ)_/¯ </h1>
        </div>
        <Container>
        <div className="game">
          <Board {...this.state} setTheState={this.setTheState}/>  {/* <Board square={this.state.squares} isXNext={this.state.isXNext}/> */}
          </div>

        </Container>
          
        {/* <div className="history">
         {this.state.history.map ((item,index) =>{
           return <div><button onClick={()=>this.timeTravel(index)}>Move {index+1}</button></div>
         })}
        </div> */}
        <div className="bottom">
          <img src="https://alienmelon.gamejolt.io/images/IMG_FIRE01.gif"/>
        </div>
      </div>
    )
  }
}
