import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function Pagination() {
    const [page, setPage] = useState();
    const [Data, setData] = useState([]);
    const [Data_Length, setData_Length] = useState();
    const [pagination, setPagination] = useState(false);
    const handlechange = (data) => {
        setPage(data.selected)
        console.log(data.selected)
        console.log(page)
    }

    const fetchApiData = async () => {
        setPagination(false)
        await axios.get(
            page ? `https://jsonplaceholder.typicode.com/comments?_page=${page + 1}`
                : "https://jsonplaceholder.typicode.com/comments?_page=1"
        ).then((res) => {
            setData(res?.data)
            setPagination(true)
        })
    }
    useEffect(() => {
        fetchApiData();
    }, [page])

    useEffect(() => {
        const DataLength = async() => {
            await axios.get("https://jsonplaceholder.typicode.com/comments").then((res)=>{
                setData_Length(res.data.length/10)
            });
        }
        DataLength();
    }, [])
    return (
        <div>
        <button className='float-end'><Link to="/newapi">new api</Link></button>
            <div className='row'>
                {
                    Data?.map((items) => {
                        return (
                            <div className='col-md-4' key={items.id}>
                                <div className='box_shadow'>
                                    <p>name: {items.name}</p>
                                    <p>email: {items.email}</p>
                                    <p>body: {items.body}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
            pagination && Data_Length>0 &&
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={Data_Length}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlechange}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            ></ReactPaginate>
            }
        </div>
    )
}
export default Pagination
