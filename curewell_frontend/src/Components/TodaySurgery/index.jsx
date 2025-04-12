import React, { useEffect, useState } from 'react'
import apiClient from '../../Client/ApiCLient'
import SurgeryTable from "../home/SurgeryTable"
const TodaysSurgery = () => {
    const [surgery,SetSurgery]=useState([]);
    useEffect(()=>{
        apiClient.get("/surgery")
        .then(
            (response)=>{
                SetSurgery(response.data);
                // console.log(response.data);
                
            },
            (error)=>{
                console.log(error)
            }
        )
        .catch((error)=>console.log(error));
        
    },[])
  return (
    <div className='w-screen flex flex-col items-center'>
        <h1 className='text-4xl mt-4 '>{new Date().toLocaleDateString("en-GB")} surgeries</h1>
       <SurgeryTable data={surgery}/>
        
    </div>
  )
}

export default TodaysSurgery