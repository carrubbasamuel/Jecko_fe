
import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RxExit } from 'react-icons/rx';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutPages from "../Layout/LayoutPages";
import MediaList from "../components/profile_component/MedalList";
import { logout } from "../redux/userReducer";


export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profile } = useSelector(state => state.user)

    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/')
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    

    return (
        <LayoutPages>
            <Container>
                <div className="d-flex justify-content-end m-5">
                    <div onClick={handleLogout} className="logout">
                        <RxExit size={30} />
                    </div>
                </div>

                <Row id="profile" className="flex-column ">
                    <Col className="d-flex justify-content-start align-items-stretch gap-3" >
                        <div className="userProfile">
                            <div className="d-flex align-items-center">
                                <Image id="avatar" src={profile?.avatar} alt='avatar' roundedCircle width={150} height={150} />
                                <div className="ms-5">
                                    <h6 className="fw-bold">{profile?.username}</h6>
                                    <h1>{profile?.name} {profile?.surname}</h1>
                                    <h3>{profile?.motto}</h3>
                                    {profile?.city ? <span className="fs-6"><FaMapMarkerAlt /> {profile?.city}</span> : null}
                                </div>
                            </div>
                            <hr style={{
                                width: "146px",
                                transform: "rotate(90deg)"
                            }} />
                            <div className="games">
                                <p className="text-center">
                                    Partite create <br /> <span>{profile?.createdGames}</span>
                                </p>
                                <p className="text-center">
                                    Giocate <br /> <span>{profile?.games}</span>
                                </p>
                            </div>
                            
                            
                        </div>
                    </Col>
                    <Col>
                        <MediaList />
                    </Col>
                </Row>
            </Container>
        </LayoutPages>
    )
}