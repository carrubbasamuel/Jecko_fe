
import { Col, Container, Image, Row } from "react-bootstrap";
import { RxExit } from 'react-icons/rx';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutPages from "../Layout/LayoutPages";
import { logout } from "../redux/userReducer";

export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profile } = useSelector(state => state.user)

    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/')
    }

    return (
        <LayoutPages>
            <Container>
                <div className="d-flex justify-content-end m-5">
                    <div onClick={handleLogout} className="logout">
                        <RxExit size={30} />
                    </div>
                </div>

                <Row className="flex-column ">
                    <Col className="d-flex justify-content-evenly align-items-center">
                        <div className="d-flex align-items-center">
                            <Image id="avatar" src={profile?.avatar} alt='avatar' roundedCircle width={150} height={150} />
                            <div className="ms-5">
                                <h1>{profile?.username}</h1>
                                <h2>{profile?.name} {profile?.surname}</h2>
                                <h3>{profile?.motto}</h3>
                            </div>
                            </div>
                            {/* <div className="point">
                                <h1 className="text-center">Eventi</h1>
                                <div className="d-flex">
                                    <div>
                                    <h3>Prtecipati</h3>
                                    <h2>{profile?.games.length}</h2>
                                </div>
                                <div className="ms-3">
                                    <h3>Creati</h3>
                                    <h2>{profile?.createdGames.length}</h2>
                                </div>
                                </div>
                            </div> */}
                        

                    </Col>
                </Row>
            </Container>
        </LayoutPages>
    )
}