import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutEntryPoint from "./Layout/LayoutEntryPoint";
import PROTECTED_ROUTE from "./Protected_Route";
import FormLogin from "./components/entry_point_component/form_login";
import FormSingup from "./components/entry_point_component/form_singup";
import Home from "./pages/home";
import Maps from "./pages/map";
import Profile from "./pages/profile";

import { useDispatch } from "react-redux";
import { fetchOnLoadEvent } from "./redux/eventReducer";








function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LayoutEntryPoint><FormLogin /></LayoutEntryPoint>} />
          <Route path="/singup" element={<LayoutEntryPoint><FormSingup /></LayoutEntryPoint>} />
          <Route path="/" element={<PROTECTED_ROUTE element={<Home />} />} />
          <Route path="/map" element={<PROTECTED_ROUTE element={<Maps />} />} />
          <Route path="/profile" element={<PROTECTED_ROUTE element={<Profile />} />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>

  );
}


export default App;
