import React, {Component} from "react";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from './AuthenticationService';
import moment from 'moment'

class ListTodoComponent extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            todo: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount(){
        this.refreshTodos()
    }

    refreshTodos(){
        let username = AuthenticationService.getUser()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log(response)
                this.setState({todo: response.data})
            }
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getUser()
        console.log(username, id)
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message: `Delete of todo ${id} Successful`})
                this.refreshTodos()
            }
        )
    }
    updateTodoClicked(id){
        this.props.history.push(`/todo/${id}`)
        // let username = AuthenticationService.getUser()
        // console.log(username, id)
        // TodoDataService.deleteTodo(username, id)
        // .then(
        //     response => {
        //         this.setState({message: `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //     }
        // )
    }

    addTodoClicked(){
        this.props.history.push('/todo/-1')
    }

    render(){
        return (
        <div className="container">
            <h1>List Todo</h1>
            {this.state.message!=null && <div className="alert alert-success">{this.state.message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is Completed?</th>
                        <th>Target Date</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.todo.map(todo =>{
                            return(
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed.toString()}</td>
                                    <td className="datepicker">{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>
                                )
                        })
                    }
                </tbody>
            </table>
            <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
            </div>
        </div>
        )
    }
}

export default ListTodoComponent;