import UserForm from "../component/user/user.form";
import UserTable from "../component/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../service/api.service';
const UserPage = () => {

    const [dataUser, setDataUser] = useState([])
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        // console.log("check res", res)
        setDataUser(res.data)

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
                />
            </div>
        </div>
    )
}
export default UserPage;