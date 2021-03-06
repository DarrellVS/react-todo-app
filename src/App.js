import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/croodles'
import './css/App.css'

// User ID Handling
const userID = localStorage.getItem('todosApp.userID')
if (!userID) localStorage.setItem('todosApp.userID', uuidv4())
let svg = generateSVG(userID)

function generateSVG(seed) {
  return createAvatar(style, {
    seed: seed,
  })
}

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  // Load Stored Todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todosApp.todos'))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Store todos upon array change
  useEffect(() => {
    localStorage.setItem('todosApp.todos', JSON.stringify(todos))
  }, [todos])

  // New User ID
  function generateNewUserID() {
    const newUserID = uuidv4()
    localStorage.setItem('todosApp.userID', newUserID)
    svg = generateSVG(newUserID)
    forceUpdate()
  }

  function validateInput(e) {
    if(e.code === 'Enter') handleAddTodo()
  }

  // Add a todo element to the todos array
  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: name, complete: false },
    ])
    todoNameRef.current.value = null
  }

  // Clear completed todos from array
  function handleClearComplete(e) {
    setTodos(todos.filter((todo) => !todo.complete))
  }

  // Toggle a todo from complete to incomplete and vice versa
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Return a populated todolist and corresponding inputs
  return (
    <main className="container">
      <h1 className="page-header" onClick={generateNewUserID}>
        <div dangerouslySetInnerHTML={{ __html: svg }}></div>
        Darrell's Todo List
      </h1>
      <div className="counter">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>

      <TodoList todos={todos} toggleTodo={toggleTodo} />

      <div className="inputs">
        <input ref={todoNameRef} type="text" onKeyDown={validateInput} />
        <button onClick={handleAddTodo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
        </button>
        <button onClick={handleClearComplete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eraser"
            viewBox="0 0 16 16"
          >
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
          </svg>
        </button>
      </div>
    </main>
  )
}

export default App
