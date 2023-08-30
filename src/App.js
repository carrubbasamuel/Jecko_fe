import useGeoLocation from "./Hooks/Geeolocation_hook";



function App() {
  const location  = useGeoLocation();
 
  return (
    <div>
      <h1 className="text-primary">hello</h1>
    </div>
  );
}


export default App;
