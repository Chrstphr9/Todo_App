import React from "react";
import { IconContext } from "react-icons/lib";
import { FaCheckCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

export default function Todo({
    todo,
    toggleComplete,
    handleDelete,
    handleEdit,
    filteredTodos 
}) {
    const [newTitle, setNewTitle] = React.useState(todo.title);

    const handleChange =(e) => {
        e.preventDefault();
        if (todo.complete === true) {
            setNewTitle(todo.title);
        } else {
            todo.title = "";
            setNewTitle(e.target.value);
        }
    };
    
    return(
        <div className="todo">
            <input
            style={{ textDecoration: todo.completed && "line-through"}}
            type="text"
            value= {todo.title ===""? newTitle : todo.title}
            className="list" 
            onChange={handleChange}
            />
            <IconContext.Provider value={{size: "2rem"}}>
            <div>
                <button className="button-complete"
                onClick={() => toggleComplete(todo)} >
                   <FaCheckCircle />
                </button>
                <button 
                className="button-edit"
                onClick={() => handleEdit(todo, newTitle)}
                >
                   <FaEdit />
                </button>
                <button
                 className="button-delete"
                 onClick={() => handleDelete(todo.id)}
                 >
                   <FaTrash />
                </button>
            </div>
            </IconContext.Provider>
        </div>
    );
}