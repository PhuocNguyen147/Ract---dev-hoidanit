import { useContext } from "react";
import { AuthContext } from "../component/context/auth.context";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";


const PrivateRouter = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
        return (
            <>
                {props.children}

            </>
        )
    }

    // return (
    //     <Navigate to="/login" replace />
    // )

    return (
        <Result
            status="404"
            title="Oops!"
            subTitle={"Bạn phải đăng nhập"}
            extra={<Button type="primary">
                <Link to="/">
                    <span>
                        Back to Homepage
                    </span>
                </Link>
            </Button>}
        />
    )
}

export default PrivateRouter