import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchApi  = async() => {
      try {
        // const response = await fetch("http://localhost:5000/api/home");
        const response = await fetch("/v1");
        console.log("YESSSS");
        console.log(response);
        const data = await response.json();
        console.log(data);
        setBackendData(data);
      } catch(error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchApi();

  }, []);

  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-red-500">Hello Tailwindcss with React Vite</h1>
        
        {!backendData
          ? <p>Loading...</p>
          : backendData.users.map((user, i) => (<p key={i}>{user}</p>))
        }
      </div>
    </>
  )
}

export default App
