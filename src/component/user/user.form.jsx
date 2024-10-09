import { Input, notification, Modal } from 'antd';
import { Button } from "antd";
import { useState } from 'react';
import { createUserAPI, updateUserAPI } from '../../service/api.service';

const UserForm = (props) => {
    const { loadUser } = props
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [phone, setPhone] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        // debugger
        if (res.data) {
            notification.success({
                message: "Create User Success",
                description: "tao moi nguoi dung thanh cong"
            })
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                message: "loi tao user",
                description: JSON.stringify(res)
            })
        }
        console.log("check res:", res.data)
    }
    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassWord("");
        setPhone("");
    }


    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type="primary"
                    onClick={() => setIsModalOpen(true)}
                > Create User </Button>
            </div>

            <Modal title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            onChange={(event) => setFullName(event.target.value)}
                            value={fullName}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            onChange={(event) => setPassWord(event.target.value)}
                            value={password}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                        />
                    </div>
                </div>
            </Modal>
        </div>

    )
}
export default UserForm;