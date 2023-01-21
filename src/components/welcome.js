import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Welcome() {
    const [apiData, setApiData] = useState([]);
    const geyData = async () => {
        if(apiData !== ''){
          await axios.get(`https://reactjs-application-a1e1c-default-rtdb.firebaseio.com/Users_Data_Records.json`).then((res) => {
            setApiData(res.data);
           
          })
        }
      }

      useEffect(() => {
        geyData();
      }, [])

  return (
    <div>
    <h1>welcome:{apiData.email}</h1>
      
    </div>
  )
}

export default Welcome;
