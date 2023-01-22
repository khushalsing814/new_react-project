import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisH, FaAngleDown, FaAngleUp } from "react-icons/fa";
import axios from 'axios';


const Main = () => {
    const [cardData, setCardData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [updatereadbtn, setUpdatereadbtn] = useState(true);   //toggleclass bootstrap class
    const [toggledescription, setToggledescription] = useState(true);   //toggleclass bootstrap class
    const [load_spinner, setLoad_spinner] = useState(false);
    const [dropdown, setDropdown] = useState(true);   //toggleclass bootstrap class
    const [changetext, setchangetext] = useState(true);  //change text read-more
    const [postperpage, setPostperpage] = useState(5);
    const [spinner, setSpinner] = useState(false);
    const [showbtn, setShowbtn] = useState(false);
    const [changefa_icon, setChangefa_icon] = useState(true);
    const [mouseover, setMouseover] = useState(false);

    const handlereadmore = (itemid) => {
        console.log(itemid)
        console.log('clicked')
        setUpdatereadbtn(updatereadbtn => ({ ...updatereadbtn, [itemid]: !updatereadbtn[itemid] }))
        setToggledescription(toggledescription => ({ ...toggledescription, [itemid]: !toggledescription[itemid] }))
        setchangetext(changetext => ({ ...changetext, [itemid]: !changetext[itemid] }))
    }
    // loadmore start
    const loadmore = () => {
        setLoad_spinner(true)
        setTimeout(() => {
            if (postperpage < cardData.length) {
                setPostperpage(postperpage + 5);
            }
            setLoad_spinner(false)
        }, 1000);
    }
    // loadmore end

    const fetchData = async () => {
        setSpinner(true);
        setShowbtn(false)
        await axios.get('https://fakestoreapi.com/products').then((res) => {
            setCardData(res?.data);
            setUpdateData(res?.data);
            setSpinner(false);
            setShowbtn(true);
        })
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="row">
                <h3>Total no. cards {cardData.length > 0 ? <span style={{ color: "red" }}>{cardData.length}</span> : <span style={{ color: "red" }}>...</span>} data showing perpage <span style={{ color: "red" }}>{postperpage}</span></h3>
                {
                    spinner ?
                        <span className="loader"></span>
                        :
                        updateData?.slice(0, postperpage).map((item) => {
                            return (
                                <>
                                    {/* <Link style={{textDecoration:"none"}} to={`carddata/${item.id}`}> */}
                                    <div key={item.id} className="col-lg-12">
                                        <div className="card_shadow">
                                            <span className={item.rating.rate <= 2.9 ? 'badge bg-danger float-end' : item.rating.rate <= 4.0 ? 'badge bg-warning float-end' : 'badge bg-success float-end'}>{item.rating.rate}</span>
                                            <div className="main_parent">
                                                <div className="parent_image">
                                                    <img src={item.image} alt="Girl in a jacket" width="100" height="100" />
                                                </div>
                                                <div className="category">
                                                    <div className="float-end">
                                                        <Link className="float-end pe-2" style={{ color: "black", position: "relative" }} onClick={() => setDropdown(dropdown => ({ ...dropdown, [item.id]: !dropdown[item.id] }),
                                                            setChangefa_icon(changefa_icon => ({ ...changefa_icon, [item.id]: !changefa_icon[item.id] })))}
                                                            onMouseEnter={() => setMouseover(mouseover => ({ ...mouseover, [item.id]: !mouseover[item.id] }))}
                                                            onMouseLeave={() => setMouseover(mouseover => ({ ...mouseover, [item.id]: !mouseover[item.id] }))}>
                                                            {mouseover[item.id] && (<div style={{ position: "absolute", bottom: "22px", whiteSpace: "nowrap", padding: "6px", right: -12, boxShadow: "0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)" }}>dropdown <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></div>)}
                                                            <span><FaEllipsisH />{changefa_icon[item.id] ? <FaAngleUp /> : <FaAngleDown />}</span></Link>
                                                        <ul className={dropdown[item.id] ? "show_toggle_content" : "dropdown-content"} style={{ listStyle: "none" }}>
                                                            <li><Link to={`carddata/${item.id}`} style={{ color: "black", textDecoration: "none" }}>More Information</Link></li>
                                                        </ul>
                                                    </div>
                                                    <p className="card_title"><span className="product_category"> Price : </span>{item.price}</p>
                                                    <p className="card_title"> <span className="product_category"> Category : </span>{item.category}</p>
                                                    <p className="card_title"><span className="product_category"> Title : </span>{item.title}</p>
                                                    <p className={toggledescription[item.id] ? 'card_title_new' : 'card_title'}><span className="product_category"> Description : </span>{item.description}</p>

                                                    <button className={updatereadbtn[item.id] ? "btn btn-success" : "btn btn-danger"} onClick={() => handlereadmore(item.id)}>{changetext[item.id] ? 'Read Less' : 'Read More'}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </Link> */}
                                </>
                            )
                        })
                }
            </div>
            {
                cardData.length === 20 && postperpage < cardData.length &&
                <button className="btn btn-primary d-block m-auto" style={{ visibility: showbtn ? "visible" : "hidden" }} type="button" onClick={loadmore}>
                    {load_spinner ?
                        <span className="spinner-border spinner-border-sm me-2 load_spinner" role="status" aria-hidden="true"></span>
                        : ''
                    }
                    load more
                </button>
            }

        </>
    )
}
export default Main