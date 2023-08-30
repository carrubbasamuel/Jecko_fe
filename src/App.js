import { BrowserRouter, Route, Routes } from "react-router-dom";
import useGeoLocation from "./Hooks/Geeolocation_hook";
import Login from "./pages/login";
import Singup from "./pages/singup";




function App() {
  const location  = useGeoLocation();
  console.log(location);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
