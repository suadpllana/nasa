import React from 'react'
import {useState ,useEffect} from "react"

const Nasa = () => {
 
    const [nasaData, setNasaData] = useState([])
    const [count , setCount] = useState(0)
    const [ loading , setLoading] = useState(false)
    const api = import.meta.env.VITE_API_KEY

    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const url = `https://api.nasa.gov/planetary/apod?count=100&api_key=${api}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setNasaData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchData();
    }, []);
    
  
    function showNext() {
      setCount(prev => (prev + 1) % nasaData.length); 
    }
   
  return (
    <>
    {loading ? 
      <h1>Loading Data...</h1>
     : 
      <div className="container">
        <h1>Nasa's famous "photo of the day"</h1>
        {nasaData.length > 0   ? (
          <>
            <h2>{nasaData[count].title}</h2>
            <p>{nasaData[count].explanation.slice(0, 150)}...</p>
            <img src={nasaData[count].url} alt={nasaData[count].title} />
            <br />
            <p>
              <strong>Date: </strong>
              {nasaData[count].date}
            </p>
            <button onClick={showNext}>Next</button>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    }
  </>
  
  )
}

export default Nasa
