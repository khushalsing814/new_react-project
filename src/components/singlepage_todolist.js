import React, {useState } from 'react'

function Singlepage_todolist() {
    const [inputData,setinputData]=useState([
            {
                name:"",
                email:"",
                date:"",
                passward:"",
               cpassward:""
            }
        ]
    );
   const[focused, setfocused]=useState(false);
   const handleValue=(e)=>{
    setinputData({...inputData,[e.target.name]:e.target.value})
    }
   const HandleSubmit=(e)=>{
    e.preventDefault();
   console.log(inputData)
    }

    const handleFocused=(e)=>{
        e.preventDefault();
        setfocused({...inputData,[e.target.id]:true[e.target.id]})
    }
  return (
    <div>
          <form className='m-3' onSubmit={HandleSubmit} id='formId'>
               <div><input id="1" className="form-control mb-2"  type="text" placeholder="name" name='name' value={inputData.name} onChange={handleValue} pattern='^[A-Za-z]{3,16}$'  onBlur={handleFocused} focused={focused.toString()} required/><span>more than 20 character</span></div> 
               <div> <input id="2" className="form-control mb-2" maxLength={30} type="email" placeholder="email" name='email' value={inputData.email} onChange={handleValue}  onBlur={handleFocused} focused={focused.toString()} required/><span>valid email address</span></div> 
               <div> <input id="3" className="form-control mb-2" maxLength={30} type="date" name='date' value={inputData.date} onChange={handleValue}  onBlur={handleFocused} focused={focused.toString()}/></div>
               <div> <input id="4" className="form-control mb-2" maxLength={30} type="text" placeholder="password" name='password' value={inputData.password} onChange={handleValue}  onBlur={handleFocused} focused={focused.toString()} required/><span>passward</span></div> 
               <div> <input id="5" className="form-control mb-2" maxLength={30} type="text" placeholder="confirm password" name='cpassword' value={inputData.cpassword} onChange={handleValue} pattern='inputData.passward' onBlur={handleFocused} focused={focused.toString()} required/><span>passward not matched</span></div> 
               <button type='submit' className='btn btn-outline-warning w-auto me-3'>submit</button>

            </form>
    </div>
  )
}

export default Singlepage_todolist
