import './component/todo/todo.css'
import TodoData from './component/todo/TodoData'
import TodoNew from './component/todo/TodoNew'
import logoReact from './assets/react.svg'
import { useState } from 'react'
const App = () => {


  const [todoList, setTodoList] = useState([
    { id: 1, name: "Phuoc Nguyen" },
    { id: 2, Level: "good" }
  ])



  const champion = "Phuoc Nguyen";
  const age = 24;

  const addNewTodo = (name) => {
    alert(`call me ${name}`)
  }
  const data = {
    address: "can tho",
    country: "vietNam"
  }

  return (
    <div className="todo-container" >
      <div className="todo-title"> Todo List </div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        name={champion}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className='todo-image'>
        <img src={logoReact} className='logo' />
      </div>

    </div>
  )
}

export default App
