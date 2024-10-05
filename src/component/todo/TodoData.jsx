const TodoData = (props) => {

    const { name, age, data, todoList } = props
    console.log("check data", props)
    return (

        <div className='todo-data '>
            <div> ten toi la {name}</div>
            <div> Learn React</div>
            <div> Learn english</div>
            <div> Learn sach</div>
            <div>
                {JSON.stringify(todoList)}
            </div>
        </div>
    )
}
export default TodoData