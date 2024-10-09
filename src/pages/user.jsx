import UserForm from "../component/user/user.form";
import UserTable from "../component/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../service/api.service';
const UserPage = () => {

    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        // console.log("check res", res)

        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }

    }
    return (
        <div>

            <div style={{ padding: "20px" }}>
                <UserForm
                    loadUser={loadUser}
                />
                <UserTable
                    dataUser={dataUser}
                    loadUser={loadUser}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                />
            </div>
        </div>
    )
}
export default UserPage;