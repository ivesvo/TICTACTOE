import React, { Component } from 'react'


export default class Square extends Component {
    render() {
        return (
            <div className="box" onClick={()=> this.props.boxClick(this.props.id)}>
                {/* BOX {this.props.id} */}
                <div> <img src={this.props.value}/>

                </div>
            </div>
        )
    }
}
