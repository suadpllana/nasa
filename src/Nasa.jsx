import React from 'react'
import {useState ,useEffect} from "react"

const Nasa = () => {
 
    const [nasaData, setNasaData] = useState([])
    const [count , setCount] = useState(0)
    const api = import.meta.env.VITE_API_KEY

  
    async function showNext(){
        const url = `https://api.nasa.gov/planetary/apod?count=100&api_key=${api}`
        const response = await fetch(url)
        const data = await response.json()
        setCount(prev => prev + 1)
        if(count >= data.length - 1){
            alert("no more photos")
            setNasaData([])
            setCount(0)
            return
        }
        
        setNasaData(data)
    }
   
  return (
    <div>
        <div className="container">
        <h1>Nasa's famous "photo of the day"</h1>
      
      {nasaData.length > 0 ? <>
        <h2>{nasaData[count].title}</h2>
        <p>{nasaData[count].explanation.slice(0,150)}...</p>
            <img src={nasaData[count].url} alt="" /><br />
            <p><strong>Date: </strong>{nasaData[count].date}</p>
                </> :<></>}
                <button onClick={showNext}>Next</button>
        </div>
       
    
    </div>
  )
}

export default Nasa
