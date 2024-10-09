import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const ViewUserDetail = (props) => {
    const {
        isDetailOpen,
        setDetailOpen,
        dataDetail,
        setDataDetail
    } = props

    console.log(">>>check dataDetail", dataDetail)
    return (
        <>
            <Drawer title="Basic Drawer"
                onClose={() => {
                    setDetailOpen(false)
                    setDataDetail(null)
                }}
                open={isDetailOpen}
            >
                {
                    dataDetail ?
                        <>
                            <p>Id: {dataDetail._id}</p>
                            <br />
                            <p>FullName: {dataDetail.fullName}</p>
                            <br />
                            <p>Email: {dataDetail.email}</p>
                            <br />
                            <p>Phone: {dataDetail.phone}</p>
                            <br />
                        </>
                        :
                        <>
                            <p>Khong co du lieu</p>

                        </>
                }

            </Drawer>
        </>
    );
}

export default ViewUserDetail;