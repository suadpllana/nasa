import React from 'react'
import {useState ,useEffect} from "react"
import { FaCircleInfo } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Nasa = () => {
 
    const [nasaData, setNasaData] = useState([])
    const [count , setCount] = useState(0)
    const [ loading , setLoading] = useState(false)
    const api = import.meta.env.VITE_API_KEY
    const [openSidebar, setOpenSidebar] = useState(false)

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
          console.log(data)
          setNasaData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchData();
    }, []);
    
  
    function nextSlide(){
      if(count > nasaData.length){
        return
      }
      setCount(prev => prev + 1);
    }
    function prevSlide(){
      if(count <= 0){
        return
      }
      setCount(prev => prev - 1);
    }
  return (
    <>
    {loading ? 
      <AiOutlineLoading3Quarters  className="loading"/>
     : 
      <div className="container">
       
        {nasaData.length > 0   ? (
          <>
           
            <img src={nasaData[count].url} alt={nasaData[count].title} />
            <h2>{nasaData[count].title}</h2>
            <FaArrowRight className="next" onClick={nextSlide}/>
            <FaArrowLeft className="prev" onClick={prevSlide}/>
            <FaCircleInfo className="info" onClick={() => setOpenSidebar(prev => !prev)}/>
            {openSidebar &&
             <div className="sidebar">
             <h3>{nasaData[count].title}</h3>
             {nasaData[count].copyright && <p>Photo taken by : {nasaData[count].copyright}</p>}
             <p>{nasaData[count].date}</p>
             <p className="description">{nasaData[count].explanation}</p>
             <FaArrowRight className="closeSidebar"  onClick={() => setOpenSidebar(prev => !prev)}/>
           </div>
            }
           
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
