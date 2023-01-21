import React from 'react'
import ReactPaginate from 'react-paginate';
import { NavLink,Link } from 'react-router-dom';
function Pagination({ totalPosts, postperpage, setcurrentpage}) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postperpage); i++) {
        pages.push(i)
    }
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    {
                        pages?.map((page, index) => {
                            return <li className="page-item"><Link className="page-link" key={index} onClick={()=>setcurrentpage(page)}>{page}</Link></li>
                           
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>

                </ul>
            </nav> 
            {/* <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={2}
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
            ></ReactPaginate>  */}
        </div>

    )
}

export default Pagination


