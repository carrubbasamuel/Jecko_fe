
import { useEffect, useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { BsFillGearFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RxExit, RxUpdate } from 'react-icons/rx';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LayoutPages from "../Layout/LayoutPages";
import EditModal from "../components/profile_component/EditModal";
import MediaList from "../components/profile_component/MedalList";
import { fetchPatchImgUser, fetchProfile, fetchUserProfile, logout } from "../redux/userReducer";



export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const LoggedUserProfile = useSelector(state => state.user.profile)
    const usersProfile = useSelector(state => state.user.userProfile)
    const [show, setShow] = useState(false);
    const fileInputRef = useRef(null);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = () => {
        const form = new FormData();
        form.append("avatar", fileInputRef.current.files[0]);
        dispatch(fetchPatchImgUser(form));
    };



    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/')
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    useEffect(() => {
        if (id) {
            dispatch(fetchUserProfile(id))
        } else {
            dispatch(fetchProfile())
        }
    }, [dispatch, id])

    const profile = id ? usersProfile : LoggedUserProfile;

    return (
        <LayoutPages>

            <Container>
                {!id && <div className="d-flex justify-content-end align-items-center m-md-5 mt-5 me-4 mb-5" onClick={handleShow}>
                    <div className="logout me-2">
                        <BsFillGearFill size={30} />
                    </div>
                    <div onClick={handleLogout} className="logout">
                        <RxExit size={30} />
                    </div>
                </div>}

                <Row id="profile" className={`flex-column ${id ? 'mt-5 pt-5' : ''}`}>
                    <Col className="d-flex justify-content-start align-items-stretch gap-3" >
                        <div className="userProfile">
                            <div className="d-flex align-items-center">
                                <div className="position-relative">
                                    <div className="image-profile">
                                        <img id="avatar" src={profile?.avatar} alt='avatar'/>
                                    </div>
                                    
                                    {!id && <div className="change"  onClick={handleAvatarClick}>
                                        <RxUpdate size={20} />
                                        <input
                                            type="file"
                                            className="file-input"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                    </div>}
                                </div>
                                <div >
                                    <h6 className="fw-bold">{profile?.username}</h6>
                                    <h1>{profile?.name} {profile?.surname}</h1>
                                    <p className="motto">{profile?.motto}</p>
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
            {profile && !id && <EditModal show={show} handleClose={handleClose} />}
        </LayoutPages>
    )
}