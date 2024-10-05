import './Mycomponent.css'
const MyComponent = () => {
    const Agephuoc = 24
    const Infor = {
        name: "Phuoc",
        age: 24
    }
    return (
        <>
            <div className='test'> Phuoc nguyen {Agephuoc}</div>
            <div> {JSON.stringify(Infor)}</div>
        </>

    )
    console.log('my function');
}
const TestComponent = () => {
    return (
        <div style={

            { borderRadius: "10px" }

        }>
            test
        </div>
    )
}
// export default MyComponent
export {
    MyComponent, TestComponent
}