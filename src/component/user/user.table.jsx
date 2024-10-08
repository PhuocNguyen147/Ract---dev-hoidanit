import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../../service/api.service';

const UserTable = () => {

    const [dataUser, setDataUser] = useState([])
    useEffect(() => {
        loadUser();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',

        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        }

    ];


    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        // console.log("check res", res)
        setDataUser(res.data)

    }

    // loadUser();
    // console.log("update dom")
    return (
        <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
    )


}
export default UserTable;