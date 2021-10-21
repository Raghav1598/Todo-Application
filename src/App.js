import React from 'react';
import TodoApp from './todo/TodoApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props){

  return (
      <div className="App">
        <TodoApp/>
      </div>
    );
}

export default App;