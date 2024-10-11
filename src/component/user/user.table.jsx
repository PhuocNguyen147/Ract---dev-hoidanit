import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../service/api.service';


const UserTable = (props) => {
    const {
        dataUser,
        loadUser,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize
    } = props

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

    const onChange = (pagination, filters, sorter, extra) => {
        //setCurrent, setPageSize
        // nếu thay đôi trang :c current
        if (pagination && pagination.current) {
            if (+pagination.current != current) {
                setCurrent(+pagination.current)
            }
        }
        // nếu thay đổi trang : pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
        console.log("check", { pagination, filters, sorter, extra })
    };
    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
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

                <div style={{ display: "flex", gap: "20px" }}>
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
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
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
                loadUser={loadUser}
            />
        </>
    )


}
export default UserTable;