import './Mycomponent.css'
const MyComponent = () => {
    return (
        <div className='test'> Phuoc nguyen</div>
    )
    console.log('my function');
}
const TestComponent = () => {
    return (
        <div style={{ borderRadius: "10px" }}>
            test
        </div>
    )
}
// export default MyComponent
export {
    MyComponent, TestComponent
}