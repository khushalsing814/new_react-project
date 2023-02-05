import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ReactPaginate from 'react-paginate';
import Pagination from './pagination';

import '../App';

function TableData() {
  const [tableData, setTabletada] = useState([]);
  const [searchfilter, setFilter] = useState([]);
  const [alphabetsFilter, setAlphabetsFilter] = useState([]);
  const [getdropdownvalue, setGetdropdownvalue] = useState('');
  const [inputfield, setinputfield] = useState('');
  const [loading, setloading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(4);
  const [pagination, setPagination] = useState(false);
  const [resultt, setResult] = useState([]);

  const lastPostIndex = currentpage * postperpage;
  const firstPostIndex = lastPostIndex - postperpage;
  const currentPosts = resultt.slice(firstPostIndex, lastPostIndex);

  const handlechange = (data) => {
    setCurrentpage(data.selected + 1)
  }

  const shownPostPerPAge = Math.ceil(tableData.length/postperpage)

  let correctvalue;
  useEffect(() => {
    fetchData();
  }, setResult, [])

  const fetchData = async () => {
    setloading(true)
    setPagination(false)
    await axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      const result = res?.data.sort((a, b) => a.name.localeCompare(b.name));
      setResult(result);
      setTabletada(result);
      setFilter(result);
      setAlphabetsFilter(result);
      setloading(false);
      setPagination(true)
    })
  }
  const handleValue = (e) => {
    const getValue = e.target.value;
    console.log(getValue);
    setinputfield(getValue);
  }

  // alphabets filter
  const handle = (event) => {
    event.preventDefault();
    const dropdownvalue = event.target.name;
    setGetdropdownvalue(dropdownvalue)
    console.log(getdropdownvalue);
  }

  return (
    <div>
      <input className="form-control" type="search" placeholder="Search Your Name" aria-label="Search" onChange={handleValue}></input>
      <Dropdown className='mt-2'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item to='/' name='k' onClick={handle}>K</Dropdown.Item>
          <Dropdown.Item to='/' name='c' onClick={handle}>C</Dropdown.Item>
          <Dropdown.Item to='/' name='g' onClick={handle}>G</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <h1 className='text-center'>Table Data</h1>
      <div className='table_parent'>
        <table className='data_table'>
          <thead>
            <tr>
              <th>s.no</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>username</th>
              <th>website</th>
              <th>company Name</th>
              <th>city</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                <button class="btn btn-primary position relative d-block m-auto" style={{ left: "50%" }} type="button" disabled>
                  <span class="spinner-border spinner-border-sm me-sm-2" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
                :
                currentPosts?.filter((items) => {
                  if (inputfield.toLocaleLowerCase() !== '') {
                    return items.name.toLocaleLowerCase().startsWith(inputfield.toLocaleLowerCase());
                  } else {
                    return items;
                  }
                })

                  /* dropdown filter */
                  .filter((items) => {
                      if (getdropdownvalue.toLocaleLowerCase() !== '') {
                        return items.name.toLocaleLowerCase().startsWith(getdropdownvalue.toLocaleLowerCase());
                      } else {
                        return items;
                      }
                    })  
                  .map((item, index) => {
                    return (
                      <>
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.username}</td>
                          <td>{item.website}</td>
                          <td>{item.company.name}</td>
                          <td>{item.address.city}</td>
                        </tr>
                      </>
                    )
                  })
            }
          </tbody>
        </table>
      </div>
      {/* <Pagination totalPosts={tableData.length} postperpage={postperpage} setcurrentpage={setCurrentpage} /> */}
      {
      pagination && currentPosts.length > 0 && !loading &&
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={shownPostPerPAge}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlechange}
        containerClassName={"pagination justify-content-end mt-2"}
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

export default TableData
