import { useState,useEffect } from 'react';
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [data, setData] = useState(null);
// fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
const getQuota = async()=>{
 const response = await fetch('https://api.harvardartmuseums.org')
 const result = await response.json();
 setData(result);
 console.log(result);
}
useEffect(() => {
  getQuota();
}, []); 

  return (
    <>
     <h1>Veni Vici!</h1>

    </>
  )
}

export default App
