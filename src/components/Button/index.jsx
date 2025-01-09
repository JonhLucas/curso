import { Component } from "react";
import './styles.css'

export class Button extends Component {
    render() {
        const {text, onClickFunction, disabled} = this.props;
        return (
        
        <button  
         className="next"
         onClick={onClickFunction}
         disabled={disabled}>
            {text}
        </button>
    );}
}