import React, { Component } from 'react';
import Square from './Square';
import X from './X.png'
import O from './O.png'


// export const Game = {
//     X:{
//         ul: 
//     }
//     O:{

//     }


export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    };

    boxClick = (id) => {
        // console.log("what is IsNext", this.props.isXnext)
        // console.log("clicked box id is", id)
        
        let squaresApp = this.props.squares
        if (this.props.squares[id] === null){
            squaresApp[id] = this.props.isXNext? X:O
        } else {
            alert("Choose different land!")
        }
       
        this.props.setTheState({square:squaresApp, isXNext:!this.props.isXNext})
        // history:[...this.props.history.slice(),{square:squaresApp, isXNext:!this.props.isXNext}]

    };
    
    calculateWinner = (squares) =>{
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [0,4,8],
        ];
        for (let i = 0; i< lines.length; i++){
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares [a] === squares[c]){
                return squares[a];
            }
        }
        return null
    };
    render() {
        
        let status =''
        let winner = this.calculateWinner(this.props.squares);
        if (winner){
        // status = <div> Winner is  <img src={this.props.squares}/> </div>
            status = `Winner is ` + winner;
        } else {
            console.log(X)
            status = <div>NEXT FIGHTER IS‿︵‿︵‿︵‿{this.props.isXNext? <img src={X} width="60"/> : <img src={O} width="60"/>}‿︵‿︵‿︵‿</div>
        }

        return (
            <div>

                <h2>{status}</h2>
              
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}

                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}

                </div>
            </div>
        )
    }
}
