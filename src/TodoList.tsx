import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }: {todos: any, toggleTodo: any}) {
    return (
        <div className="todoList">
            {todos.map((todo: any) => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            })}
        </div>
    )
}
