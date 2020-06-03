import React, { Component } from 'react'
import Board from './components/Board'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import FacebookLogin from 'react-facebook-login';


import './App.css'
import './fonts/Mixo.ttf'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      history: [
     
      ],
      squares: Array(9).fill(null),
      isXNext: true, // if its true then X , false then O 
      winner: null,
      topRank : null,
      user: null,
      
      

    };
  }
  setTheState = (obj) =>{
    this.setState(obj);
  };

  timeTravel = (id)=> {
    console.log("b2b", id)
    this.setState({squares:this.state.history[id].squares.slice(), isXNext: this.state.history[id].isXNext});

  
  }


  responseFacebook =(data)=>{

    this.setState({...this.state,user:data.name})
    console.log(this.state.user)
  }

  render() {
    return (
      <div>
        
        <Row className="justify-content-md-center">
        <h1>¯\_(ツ)_/¯  CAMEL VS DINOSAURS ¯\_(ツ)_/¯ </h1>
        {
          (this.state.user)
          ? this.state.user.name
          :  <FacebookLogin
          autoLoad={false}
          appId="206175450381158"
          fields="name,email,picture"
          callback={(resp) => this.responseFacebook(resp)}
        />
        }
        
        </Row>

        <Row>
        <Col>
          <Container className="history">
          <div className="toprank">
            <h2>TOP FIGHTER:</h2>
              {this.state.topRank!==null ?this.state.topRank.map (item => {
                      return(
                      <div>{item.player}, {item.score}</div>
                      )
                  }) :"" }
          </div>
          
          </Container>
        </Col>
        
        <Col>
          <Container fluid>
          <div className="game">
            <Board {...this.state} setTheState={this.setTheState} />  {/* <Board square={this.state.squares} isXNext={this.state.isXNext}/> */}
            </div>
          </Container>
          <div className="bottom">
          <img src="https://alienmelon.gamejolt.io/images/IMG_FIRE01.gif"/>
        </div>
          </Col>
          <Col>
            <div className="history">
          {this.state.history.map ((item,index) =>{
            return <Button className="button" variant="light" onClick={()=>this.timeTravel(index)}>Move {index+1}</Button>
          })}
          </div>
          </Col>
          

        </Row>
       
         

      
        
          
       
        
      </div>
    )
  }
}
