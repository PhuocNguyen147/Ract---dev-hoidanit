import { createContext, useState } from 'react';

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});


export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })
    const [isAppLoading, setIAppLoading] = useState(true)
    // console.log("check prooooooops ", props.children)
    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}