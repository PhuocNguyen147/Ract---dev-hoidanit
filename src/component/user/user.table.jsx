import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../service/api.service';


const UserTable = (props) => {
    const { dataUser, loadUser } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setDetailOpen] = useState(false)


    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id)
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Xóa user thành công"
            })

            await loadUser();
        }
        else {
            notification.error({
                message: "Error Delete User",
                description: JSON.stringify(res.message)
            })

        }

    }
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'
                        onClick={() => {
                            setDataDetail(record) // record lay du lieu trong truong
                            setDetailOpen(true)
                        }}
                    >{record._id}</a>
                )
            }

        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (

                <div div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />

                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn xóa user này ?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"

                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>

                </div >


            ),
        }
    ];
    // console.log("check dataupdate", dataUpdate)
    return (

        <>
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
            />

            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setDetailOpen={setDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    )


}
export default UserTable;