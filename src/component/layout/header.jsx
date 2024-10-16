import { Link, useNavigate, } from 'react-router-dom'
import { UsergroupAddOutlined, HomeOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext, } from '../context/auth.context';
import { logoutAPI } from '../../service/api.service';
const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(">>check", user)
    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success('Logout success')
            navigate("/")
        }
    }
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />

        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />

        },

        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),



        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                    key: 'logout',
                },
            ],
        }] : [])




    ];
    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}

export default Header