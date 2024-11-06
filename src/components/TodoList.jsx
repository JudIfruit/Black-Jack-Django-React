import React, { useState } from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fonction pour ajouter une tâche
    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos((prevTodos) => [...prevTodos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    // Fonction pour basculer l'état de complétion d'une tâche
    const toggleComplete = (index) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Fonction pour supprimer une tâche
    const deleteTodo = (index) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input className="addlist"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Ajouter à la liste"
            />
            <button className="button" onClick={addTodo}>Ajoutez</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <button className="todosuppr" onClick={() => deleteTodo(index)}>
                            ❌
                        </button>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
