import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
export const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // window.location.reload();
                setTodos(todos.filter((todo) => todo.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const jsonData = await response.json();
            setTodos(jsonData.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTodos();
    }, []);
    console.log(todos);
    return (
        <>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                            <>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>
                                        <EditTodo todo={todo} />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                deleteTodo(todo.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
