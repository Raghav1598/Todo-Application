import React, {Component} from "react";
import moment from 'moment'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from './AuthenticationService'

class UpdateTodoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        let username = AuthenticationService.getUser();
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
    }

    onSubmit(values){
        let username = AuthenticationService.getUser();
        TodoDataService.updateTodo(username, this.state.id, {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }).then(
            () => {
                this.props.history.push('/todo')
            }
        )
    }

    validate(values){
        let errors = {}

        if(!values.description){
            errors.description = 'Enter a Description'
        }else if(values.description.length<5){
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
    }

    render(){
        let description = this.state.description
        let targetDate = this.state.targetDate

        return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik 
                    initialValues = {{description,targetDate}} 
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name='targetDate'/>
                                </fieldset>
                                <button name="button" type="submit" className="btn btn-success">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
        )
    }
}

export default UpdateTodoComponent;