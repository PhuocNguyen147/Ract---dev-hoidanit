import UserForm from "../component/user/user.form";
import UserTable from "../component/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../service/api.service';
const UserPage = () => {

    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    // empty array => run once
    //not empty => next value != prev value
    useEffect(() => {
        loadUser();
    }, [current, pageSize]) // [] + condition xét điều kiện chạy một lần và kiểm tra xem điều kiện kế tiếp

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
    // console.log("check current  ", current)
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
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}
export default UserPage;