import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    const handleTodoClicked = () => toggleTodo(todo.id)

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClicked} />
                {todo.name}
            </label>
        </div>
    )
}
