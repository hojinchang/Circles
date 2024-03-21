import { useState, useEffect } from 'react'

import AppRouter from "./routers/AppRouter";

function App() {
  // const [backendData, setBackendData] = useState(null);

  // useEffect(() => {
  //   const fetchApi  = async() => {
  //     try {
  //       // const response = await fetch("http://localhost:5000/api/home");
  //       const response = await fetch("/");
  //       console.log("YESSSS");
  //       console.log(response);
  //       const data = await response.json();
  //       console.log(data);
  //       setBackendData(data);
  //     } catch(error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchApi();

  // }, []);

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
