import React, {Component} from "react";
import {Link} from 'react-router-dom';
import HelloWorldService from "../api/todo/HelloWorldService";

class WelcomeComponent extends Component {

    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render(){
        return (
        <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}.
                <p>You can manage your todos on clicking <Link to="/todo">here</Link>.</p>
            </div>
            <div className="container">
                Click Here to get Customized Message.
                <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div>
        </>
        )
    }

    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
    }

    handleSuccessfulResponse(response){
        this.setState({welcomeMessage: response.data.msg})
    }
}

export default WelcomeComponent;