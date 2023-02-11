import React, { useEffect, useRef, useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { encrypt, decrypt } from "n-krypta"
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const [tableData, setTableData] = useState([
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: ""
        }
    ]);
    const [formerrors, setErrors] = useState({});
    const [isSubmit, setIssubmit] = useState(false);
    const [show_password, setShow_password] = useState(true);
    const [textpassword, setTextpassword] = useState("password");
    const ref = useRef({});
    let navigate = useNavigate();

    const handleEye = () => {
        setShow_password(!show_password);
        setTextpassword(ref.current.type === 'password' ? 'text' : 'password');
    }
    // validate start
    const validate = (values) => {
        const errors = {};
        const regix_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!values.firstname) {
            errors.firstname = "Please type your firstname!";
        }
        if (!values.lastname) {
            errors.lastname = "Please type your lastname!";
        }
        if (!values.email) {
            errors.email = "Please type your email!";
        } else if (!regix_email.test(values.email)) {
            errors.email = "invalid format";
        }
        if (!values.password) {
            errors.password = "Please type your password!";
        } else if (!values.cpassword) {
            errors.cpassword = "Please type your confirm password!";
        }
        else if (values.password.length < 8 && values.cpassword.length < 8) {
            errors.password = "password should be minimum 8 character";
            errors.cpassword = "password should be minimum 8 character";
        }
        else if (values.password.length !== values.cpassword.length) {
            errors.password = "password does not matched";
            errors.cpassword = "password doe'not matched";
        }
        console.log(errors)
        return errors;
    }
    // validate end

    // fetch api start
    const detchDataApi =() => {
        if (Object.keys(formerrors).length === 0 && isSubmit) {
             try {
                localStorage.setItem('signup',JSON.stringify(tableData).toLocaleLowerCase());
                const path ="/welcome";
                navigate(path);
                alert("Data Stored")
                setTableData({ firstname: "", lastname: "", email: "", password: "", cpassword: "" })
                } catch (err) {
                    console.log("Bad Request");
                }
            }
    }
    // fetch api end

    useEffect(() => {
        detchDataApi();
    }, [formerrors])
    const handleForm = (e) => {
        e.preventDefault();
        setErrors(validate(tableData));
        setIssubmit(true);
    }

    // get value of inputfield start
    const handleValue = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        // const valuee =  e.target.value.replace(/\s/g, "");
        setTableData({ ...tableData, [key]: value.trim() })
    }
    // get value of inputfield
    return (
        <>
            <div className='form-background'>
                <h3 className='text-center'>Signup</h3>
                <form className='m-3' onSubmit={handleForm}>
                    <div className='mb-3'><input className="form-control" maxLength={30} type="text" placeholder="first name" name='firstname' value={tableData.firstname} onChange={handleValue} /><span style={{ color: "red" }}>{formerrors.firstname}</span></div>
                    <div className='mb-3'><input className="form-control" maxLength={30} type="text" placeholder="last name" name='lastname' value={tableData.lastname} onChange={handleValue} /><span style={{ color: "red" }}>{formerrors.lastname}</span></div>
                    <div className='mb-3'><input className="form-control" maxLength={30} type="email" placeholder="E-mail" name='email' value={tableData.email} onChange={handleValue} /><span style={{ color: "red" }}>{formerrors.email}</span></div>
                    <div className='mb-3' style={{ position: "relative" }}><input className="form-control" maxLength={30} type={textpassword} placeholder="password" name='password' value={tableData.password} onChange={handleValue} /><span /><span style={{ color: "red" }}>{formerrors.password}</span><span style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={handleEye}>{show_password ? <FaEyeSlash /> : <FaEye />}</span></div>
                    <div className='mb-3'><input className="form-control" maxLength={30} type={textpassword} placeholder="confirm password" name='cpassword' value={tableData.cpassword} onChange={handleValue} ref={ref} /><span style={{ color: "red" }}>{formerrors.cpassword}</span></div>
                    <button type='submit' className='btn btn-outline-primary w-100 me-3'>signup</button>
                </form>
            </div>
        </>
    )
}

export default Signup
