import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from "./LoginComponent";
import ListTodoComponent from "./TodoComponent";
import HeaderComponent from "./HeaderComponent";
import WelcomeComponent from "./WelcomeComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";
import UpdateTodoComponent from "./UpdateTodoComponent";

class TodoApp extends Component{
    render(){
        return (
            <div>
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute exact path="/todo" component={ListTodoComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <AuthenticatedRoute path="/todo/:id" component={UpdateTodoComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
                {/*<LoginComponent/>*/}
            </div>
        )
    }
}

class ErrorComponent extends Component {
    render(){
        return (<div>An Error Occured.</div>)
    }
}

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }else return null;
// }

// function ShowSuccessfulLogin(props){
//     if(props.showSuccessMessage){
//         return <div>Login Successful</div>
//     }else return null;
// }

export default TodoApp;