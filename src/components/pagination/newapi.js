import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

function Newapi() {
    const [Data, setData] = useState([]);
    const [Data_Length, setData_Length] = useState();
    const [currentpage, setCurrentPage] = useState(1);
    const [postperpage] = useState(10);
    const [pagination, setPagination] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const lastPostIndex = currentpage * postperpage;
    const firstPostIndex = lastPostIndex - postperpage;
    const currentPosts = Data.slice(firstPostIndex, lastPostIndex);
    const mathCeil = Math.ceil(Data_Length / postperpage);
    const handlechange = (data) => {
        setCurrentPage(data.selected + 1)
        console.log(data.selected)
        console.log(currentpage)
        console.log(currentPosts)
        console.log(mathCeil)
    }

    const fetchApiData = async () => {
        setSpinner(true)
        setPagination(false)
        await axios.get(`https://jsonplaceholder.typicode.com/comments`
        ).then((res) => {
            setData(res?.data)
            setData_Length(res.data.length)
            setPagination(true)
            setSpinner(false)
        })
    }
    useEffect(() => {
        fetchApiData();
    }, [])
    return (
        <div>
            <h1 className='text-center'>Table Data</h1>
            <table className='table'>
                <thead className="thead-dark">
                    <tr>
                        <th>s.no</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody style={{position:'relative'}}>
                    {
                        spinner ?
                            <span className="loader newapi"></span>
                            :
                            currentPosts?.map((items) => {
                                return (
                                    <tr key={items.id}>
                                        <td>{items.id}</td>
                                        <td>{items.name}</td>
                                        <td>{items.email}</td>
                                        <td>{items.body}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
            {
                pagination && Data_Length > 0 && !spinner &&
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={mathCeil}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
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
export default Newapi
