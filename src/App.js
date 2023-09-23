import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutEntryPoint from "./Layout/LayoutEntryPoint";
import PROTECTED_ROUTE from "./Protected_Route";
import FormLogin from "./components/entry_point_component/form_login";
import FormSingup from "./components/entry_point_component/form_singup";
import Home from "./pages/home";
import Maps from "./pages/map";
import OauthSuccess from "./pages/oAuthSuccess";
import Profile from "./pages/profile";









function App() {
  const {user_token} = useSelector(state => state.user);
  const {socket } = useSelector(state => state.socket);

  useEffect(() => {
    if(user_token){
      socket.emit('saveTokenUser', user_token)
    }

    return () => {
      socket.emit('delateTokenUser', user_token)
      socket.off('saveTokenUser')
      socket.off('delateTokenUser')
    }
  }, [user_token, socket])

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LayoutEntryPoint><FormLogin /></LayoutEntryPoint>} />
          <Route path="/singup" element={<LayoutEntryPoint><FormSingup /></LayoutEntryPoint>} />
          <Route path="/login/:token" element={<OauthSuccess />} />
          <Route path="/" element={<PROTECTED_ROUTE element={<Home />} />} />
          <Route path="/map" element={<PROTECTED_ROUTE element={<Maps />} />} />
          <Route path="/profile" element={<PROTECTED_ROUTE element={<Profile />} />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
      />
    </>

  );
}


export default App;
