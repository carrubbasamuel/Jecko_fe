import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutEntryPoint from "./Layout/LayoutEntryPoint";
import PROTECTED_ROUTE from "./Protected_Route";
import FormLogin from "./components/entry_point_component/form_login";
import FormSingup from "./components/entry_point_component/form_singup";
import Home from "./pages/home";






function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LayoutEntryPoint><FormLogin /></LayoutEntryPoint>} />
          <Route path="/singup" element={<LayoutEntryPoint><FormSingup /></LayoutEntryPoint>} />
          <Route exact path="/" element={<PROTECTED_ROUTE element={<Home />} />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>

  );
}


export default App;
