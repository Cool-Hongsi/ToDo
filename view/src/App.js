import React from 'react';
import NavBar from './components/NavBar';
import Todo from './components/Todo';

export default class App extends React.Component{
  render(){
    return(
      <div>
        <NavBar />
        <Todo />
      </div>
    )
  }
}