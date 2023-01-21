import React, { useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function CardData({match}) {
    const [updateDataa, setUpdateDataa] = useState([]);
    const { id } = useParams();
    const [spinner, setSpinner] = useState(false);
  
    useEffect(() => {
        const fetchData = async() => {
            setSpinner(true);
            await axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
                const result = res?.data;
                setUpdateDataa(result);
                setSpinner(false);
            })
        }
        fetchData();
        
    }, []);
    
    return (
        <>
            {

                spinner ?
                    <span className="loader"></span>
                    :
                   
                                <div>
                                    <h1>{updateDataa.price}</h1>
                                    <h1>{updateDataa.category}</h1>
                                    <h1>{updateDataa.title}</h1>
                                </div>
                    
            }
        </>
    )
}

export default CardData
