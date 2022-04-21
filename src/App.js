import './App.css';
import Header from './mycomponents/Header';
import Todos from "./mycomponents/Todos";
import Addtodo from "./mycomponents/Addtodo";
import Footer from "./mycomponents/Footer";
import About from "./mycomponents/About";
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am on Delete", todo);
    //deleting not way in react
    // let index=todos.indexOf(todo);
    // todos.splice(index,1);

    settodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    settodos([...todos, myTodo]);
    console.log(myTodo);
  }



  const [todos, settodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
     <>
     
     <Router>
       <Header title="My Todo List" searchbar={false} /> 

          <Routes>
          <Route exact path="/" element={ <>
                <Addtodo addTodo={addTodo} />
                 <Todos todos={todos} onDelete={onDelete} />
                 </>}>
           </Route>

           <Route path="/About" element={<About />} />
        
          

       </Routes>


         <Footer />
     </Router> 


    </>
  );
}

export default App;

