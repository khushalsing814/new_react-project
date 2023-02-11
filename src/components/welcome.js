import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Welcome() {
  const [apidata, setApiData] = useState([]);

  useEffect(() => {
    axios("https://dummyjson.com/products").then((res) => {
      setApiData(res?.data?.products);
    });
  }, []);
  console.log(apidata, "here is console of api data")
  return (
    <div>
      {
        apidata?.map((item, index) => {
          return (
            <div>
              <div>{item.title}</div>
              <div>{item.brand}</div>
              <img src={item.images} />
              <div>{item.description}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Welcome;
