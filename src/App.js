import './App.css';
import React, {useState, useEffect } from "react";
import Title from "./components/Title";
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import Form from './components/Form';
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { async } from '@firebase/util';

function App() {
  const [todos, SetTodos] = React.useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);


  useEffect(() => { 
    filteredHandler();
  }, [todos, status]);

  const filteredHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };  

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id });
      });
      SetTodos(todosArray);
    });
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id),{
      completed: !todo.completed
    });
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  }



  return (
    <div className="App">
      <div>
        <Title />
      </div>
      <div>
        <AddTodo />
      </div>
      <div>
        <Form 
        //for filtered todo   
        setStatus= {setStatus}
        
        />
      </div>
      
      <div className='todo_container'>
        {filteredTodos.map((todo) =>(
         <Todo 
         key={todo.id}
         todo={todo}
         toggleComplete={toggleComplete}
         handleDelete={handleDelete}
         handleEdit={handleEdit}
         filtetredTodos= {filteredTodos}
         />
        ))}
      </div>
    </div>
  );
  }

export default App;
