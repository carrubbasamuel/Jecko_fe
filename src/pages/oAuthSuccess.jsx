import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/userReducer"

export default function OauthSuccess() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        if (token) {
            localStorage.setItem('user', token)
            dispatch(setUser(token))
            navigate("/")
        }else{
            navigate("/login")
        }
    }, [token, navigate])

    return (
        <>
        
        
        </>
    )
}