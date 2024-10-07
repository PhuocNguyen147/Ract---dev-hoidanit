import './component/todo/todo.css'
import TodoData from './component/todo/TodoData'
import TodoNew from './component/todo/TodoNew'
import logoReact from './assets/react.svg'
import { useState } from 'react'
const App = () => {
  const [todoList, setTodoList] = useState([])

  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 100),
      name: name
    }
    setTodoList([...todoList, newTodo])
  }

  const deleteTodo = (id) => {
    const newTodo = todoList.filter(item => item.id !== id)
    setTodoList(newTodo)
    // console.log("check id", id)

  }
  return (
    <div className="todo-container" >
      <div className="todo-title"> Todo List </div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      {
        todoList.length > 0 ?
          <TodoData
            todoList={todoList}
            deleteTodo={deleteTodo}
          />
          :
          <div className='todo-image'>
            <img src={logoReact} className='logo' />
          </div>

      }

      {/* {
        todoList.length > 0 &&
        <TodoData
          todoList={todoList}
        />
      }

      {
        todoList.length === 0 &&
        <div className='todo-image'>
          <img src={logoReact} className='logo' />
        </div>
      } */}
    </div>
  )
}

export default App
