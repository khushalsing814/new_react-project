import React, { useEffect, useState } from 'react'

function Todolistdata({ listData, setListData, setTabledata,setToggleupdatebtn,setUpdatedata }) {
    const handledelled = (index) => {
        if (window.confirm('You want to delete ?')) {
            const updatelist = listData.filter((elm, id) => {
                return index !== id;
            })
            setListData(updatelist);
        }
    }
    const updated =(updateid)=>{
        const update = updateid
        return update
    }
    const handleUpdate = (updateid) => {
        if (window.confirm('You want to update ?')) {
            //eslint-disable-line
            setToggleupdatebtn(false)
            setUpdatedata(updated(updateid))
            setTabledata(listData[updateid])
        }
    }
    return (
        <div>
            <h1 className='text-center'>Todolist</h1>
            <table className="table table-bordered position-relative">
                <thead>
                    <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listData.length > 0 ?
                            listData.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <p>
                                                    <span className='btn btn-success me-2' onClick={() => handleUpdate(index)}>edit</span>
                                                    <span className='btn btn-danger' onClick={() => handledelled(index)}>Delled</span>
                                                </p>
                                            </td>

                                        </tr>

                                    </>
                                )

                            })
                            : <div className='alert alert-danger text-center w-100" role="alert"' style={{ left: 0, right: 0, top: 0, position: "absolute" }}>Sorry No data avaible</div>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Todolistdata
