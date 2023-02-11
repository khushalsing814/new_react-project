import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Protected(props) {
    const navigate = useNavigate();
    const { Cmp } = props;
    useEffect(() => {
        let login = localStorage.getItem('signup')
        if (!login) {
            navigate('/login')
        } else {
            navigate('/welcome')
        }
    })
    return (
        <div>
            <Cmp />
        </div>
    )
}

export default Protected
