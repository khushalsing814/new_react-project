import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    if (localStorage.getItem("signup")) {
        const users = JSON.parse(localStorage.getItem('signup'))
        localStorage.removeItem(users)
        const path = "/login";
        navigate(path);
    }
    return (
        <div>

        </div>
    )
}

export default Logout
