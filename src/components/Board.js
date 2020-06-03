import React, { Component } from 'react';
import Square from './Square';
import X from './X.png'
import O from './O.png'



export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    };

    boxClick = (id) => {
        // console.log("what is IsNext", this.props.isXnext)
        // console.log("clicked box id is", id)
        if (this.props.winner){
            
            return;
        } 
        let squaresApp = this.props.squares
        if (this.props.squares[id] === null){
            squaresApp[id] = this.props.isXNext? X:O
        } else {
            alert("Choose different land!")
            return;
            
        }
       
        this.props.setTheState({squares:squaresApp, isXNext:!this.props.isXNext, history:[...this.props.history.slice(),{squares:squaresApp.slice(), isXNext:!this.props.isXNext}]})
        this.calculateWinner(this.props.squares);
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
        ]
        for (let i = 0; i< lines.length; i++){
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares [a] === squares[c]){
                this.props.setTheState({winner:squares[a]})
                this.postData()
                
                return;
            }
        }
        return null
    };
    
    postData = async() =>{

    let data = new URLSearchParams();
    console.log("player",this.props.user, "score")
    data.append("player", this.props.user);
    data.append("score", '⌛');
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString(),
    json: true
}
    );

    console.log(response.items)
}
    getData= async()=>{
        const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
        let res = await fetch(url)
        let data = await res.json()
        // console.log("data is", data)
        this.props.setTheState({
            topRank:[...data.items]
        })

}
    componentDidMount =()=> {
        this.getData();
    }
        
    render() {
        
        let status ='';
        let winner = this.props.winner;
        if (winner){
        // status = <div> Winner is  <img src={this.props.squares}/> </div>
        status = <div>WINNER IS  <img src={this.props.winner} width="60"/>  GAME OVER! </div>
        } else {
           
            status = <div className="fighter">NEXT FIGHTER IS‿︵‿︵‿︵‿{this.props.isXNext? <img src={X} width="60"/> : <img src={O} width="60"/>}‿︵‿︵‿︵‿</div>
        }
        console.log(this.props.topRank)

        return (
            <div>

                <h2>{status}</h2>
              {/* {this.props.topRank!==null ?this.props.topRank.map (item => {
                  return(
                  <div>{item.player}, {item.score}</div>
                  )
              }) :"" } */}
              {/* {
                  this.state.topRank ?"aaaaaaaaa" :"bbbb"
              } */}
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
