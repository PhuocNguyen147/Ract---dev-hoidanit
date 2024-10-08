import { Input, notification } from 'antd';
import { Button } from "antd";
import { useState } from 'react';
import { createUserAPI, updateUserAPI } from '../../service/api.service';

const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [phone, setPhone] = useState("")

    const handleClickBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        // debugger
        if (res.data) {
            notification.success({
                message: "Create User Success",
                description: "tao moi nguoi dung thanh cong"
            })
        } else {
            notification.error({
                message: "loi tao user",
                description: JSON.stringify(res)
            })
        }
        console.log("check res:", res.data)
    }


    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full Name</span>
                    <Input
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        onChange={(event) => setPassWord(event.target.value)} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div>
                    <Button type="primary"
                        onClick={() => handleClickBtn()}
                    > Create User </Button>
                </div>
            </div>
        </div>

    )
}
export default UserForm;