import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import HomePage from './src/HomePage';

class APP extends Component{
    render(){
        return(
            <HomePage/>
        )
    }
}

ReactDOM.render(<APP/>, document.getElementById('app'));
