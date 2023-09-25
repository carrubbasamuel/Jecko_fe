import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/userReducer"


export default function OauthSuccess() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (token) {
            setLoading(true)
            localStorage.setItem('user', token)
            dispatch(setUser(token))
            navigate("/")
        } else {
            navigate("/login")
        }
    }, [token, navigate, dispatch])

    return (
        <>
            {loading && (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
}
