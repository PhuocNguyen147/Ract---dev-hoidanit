import { useState } from "react"

const TodoNew = (props) => {
    // const { addNewTodo } = props
    // addNewTodo("Phuoc");

    const [valueInput, setValueInput] = useState('eric')


    const handleOnchange = (name) => {
        console.log("handleOnchange", name)
        setValueInput(name)
    }

    const handleClick = () => {
        alert(valueInput)
    }


    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => { handleOnchange(event.target.value) }}
            />
            <button style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add </button>
            <div>
                My text input is {valueInput}
            </div>
        </div>
    )
}
export default TodoNew