import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import Todolistdata from './todolistdata'

// get data in localstorage
const geData = () => {
    const getdata = localStorage.getItem('list');
    if (getdata) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

function Todolist() {
    const array = [{
        firstname: '',
        lastname: '',
        email: '',
    }]
    const [tableData, setTabledata] = useState(array);
    const [listData, setListData] = useState(geData());
    const [updatedata, setUpdatedata] = useState();
    const [toggleupdatebtn, setToggleupdatebtn] = useState(true);
    const [checkedUpdate, setCheckedUpdate] = useState([]);


    const handleValue = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        const userid = { id: new Date().getTime().toString(), ...tableData };
        setTabledata(() =>
            ({ ...userid, [key]: value.trim() }))
        console.log(tableData)
    }
    const handleForm = (e) => {
        e.preventDefault();
        if (!tableData.firstname || !tableData.lastname || !tableData.email) {
            alert('all fields are required')
        } else {
            //  setListData([...listData, tableData])
            // setTabledata([])

            // instent update (2ND METHOD) remove default initial array
            setListData((listData) => {
                const updateList = [...listData, tableData];
                // console.log(updateList)
                return updateList;
            })
            alert("Data Stored")
            setTabledata({ firstname: "", lastname: "", email: "" })
        }
    }
    const reset = (e) => {
        e.preventDefault();
        setTabledata({ firstname: "", lastname: "", email: "" })
    }
    const removeall = () => {
        setListData([])
        setToggleupdatebtn(true)
    }

    const update = (e) => {
        e.preventDefault();
        setListData(
            listData.map((elm, index) => {
                if (index === updatedata) {
                    console.log(index)
                    console.log(updatedata)
                    console.log(tableData)
                    return  elm, tableData ;
                }
                return elm
            })
        )

    }


    // add data in localstorage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(listData))
    }, [listData])


    return (
        <div>
            <form className='m-3'>
                <input className="form-control mb-2" maxLength={30} type="text" placeholder="first name" name='firstname' value={tableData.firstname} onChange={handleValue} />
                <input className="form-control mb-2" maxLength={30} type="text" placeholder="last name" name='lastname' value={tableData.lastname} onChange={handleValue} />
                <input className="form-control mb-2" maxLength={30} type="text" placeholder="e-mail" name='email' value={tableData.email} onChange={handleValue} />
                {
                    toggleupdatebtn ?
                        <button type='submit' className='btn btn-outline-success w-auto me-3' onClick={handleForm}>Submit</button>
                        :
                        <button type='submit' className='btn btn-outline-primary w-auto me-3' onClick={update}>update</button>
                }
                {listData.length > 0 &&
                    <button type='submit' className='btn btn-outline-danger w-auto me-3' onClick={removeall}>remove all</button>
                }
                <button type='submit' className='btn btn-outline-warning w-auto me-3' onClick={reset}>Reset</button>

            </form>
            <Todolistdata listData={listData} setListData={setListData} removeall={removeall} setTabledata={setTabledata} setUpdatedata={setUpdatedata} tableData={tableData} setToggleupdatebtn={setToggleupdatebtn} />
        </div>
    )
}

export default Todolist
