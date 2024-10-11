
import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI, } from '../../service/api.service';
const ViewUserDetail = (props) => {
    const {
        isDetailOpen,
        setDetailOpen,
        dataDetail,
        setDataDetail,
        loadUser
    } = props
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            return;
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]

        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(selectedFile))   //lấy đường URL để hiển thị hình ảnh

        }
        console.log(">>>check file  ", file)
    }

    const handleUpdateUserAvatar = async () => {
        //step 1 : upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            //success;
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)

            // console.log(">>>check new Avatar", newAvatar)
            if (resUpdateAvatar.data) {
                setDetailOpen(false)
                setPreview(null)
                setSelectedFile(null)
                await loadUser();

                notification.success({
                    message: "upload user avatar",
                    description: "cập nhật avatar thành công"
                })
            } else {

                notification.error({
                    message: "Error upload avartar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {

            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }

        // console.log(">>>check Upload", resUpload)

    }
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

                            <br />
                            <p>Avatar:</p>
                            <div style={{
                                marginTop: "10px",
                                height: "100px", width: "150px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                            </div>
                            <div>
                                <label htmlFor='btnUpload' style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}>
                                    Upload Avatar
                                </label>
                                <input type='file' hidden id='btnUpload'
                                    onChange={(event) => handleOnchangeFile(event)}
                                />

                                {preview &&

                                    <>

                                        <div style={{
                                            marginTop: "10px",
                                            height: "100px", width: "150px",
                                            border: "1px solid #ccc"
                                        }}>
                                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                                src={preview} />
                                        </div>
                                        <Button
                                            onClick={() => handleUpdateUserAvatar()}
                                            type='primary'>Save</Button>
                                    </>
                                }



                            </div>


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