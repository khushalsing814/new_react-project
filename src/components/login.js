import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link,useNavigate} from 'react-router-dom';
function Login() {

  const [inputData, setinputData] = useState(
    {
      email:"",
      password:"",
    }
  );
  const [apiData, setApiData] = useState([]);
  const [checkvalidation,setCheckvalidation ] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem('signup');
    if (!login) {
        navigate('/login')
    } else {
        navigate('/welcome')
    }
},[])
  // const geyData = async () => {
  //   if(apiData !== ''){
  //     await axios.get(`https://reactjs-application-a1e1c-default-rtdb.firebaseio.com/Users_Data_Records.json`).then((res) => {
  //       setApiData(res.data);
  //     })
  //   }
  // }
  // useEffect(() => {
  //   geyData();
  // }, [])

  const handlevalue=(e)=>{
    setinputData({...inputData,[e.target.name]:e.target.value})
  }

  const HaldleValidate = (e)=>{
    e.preventDefault();
   let a=localStorage.getItem('signup')
   let a1= JSON.parse(a)
    let check_email = (inputData.email).toLowerCase();
    let check_password = (inputData.password).toLowerCase();
    console.log(check_email)
    console.log(check_password)
    if(a1.email === check_email && a1.password === check_password){
      alert('success')
      const path ="/Welcome";
      navigate(path);
    }else{
      alert('fail') 
    }
  //   const fetchresult=[];
  //   for(let key in apiData){
  //     fetchresult.unshift(
  //         {
  //             ...apiData[key],id:key
  //         }
  //     )
  //     setCheckvalidation(validate(...fetchresult));
  // }

  }
  return (
    <>
      <div className='form-background'>
        <h3 className='text-center'>Login</h3>
        <form className='m-3' onSubmit={HaldleValidate}>
          <div className='mb-3'><input className="form-control" maxLength={30} type="email" placeholder="Email" name='email' onChange={handlevalue} value={inputData.email} /> </div>
          <div className='mb-3'><input className="form-control" maxLength={30} type="password" placeholder="Password" name='password' onChange={handlevalue} value={inputData.password}/> </div>
          <button type='submit' className='btn btn-outline-success w-100 me-3'>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
