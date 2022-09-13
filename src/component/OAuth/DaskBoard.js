import React from "react";
import "../OAuth/DashBoard.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "./dash_images/main_logo.png";
import list_icon from "./dash_images/list-icon.png";
import admin_image from "./dash_images/admin_image.png";
import { useNavigate, NavLink, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import About from "./About";
import Contect from "./Contect";
import axios from "axios";
import OrderPopUp from "./OrderPopUp";

const DeskBoard = () => {
  // const [onChange,setOnChange]= useState([])
  // const [searchInput,setSearchInput] = useState([]) // for api 
  // const navigate = useNavigate();
  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //   .then((responce)=>{
  //       setSearchInput(responce.data)
  //     }).catch(error=>{
  //     alert(error)
  //   })
  //   const x = JSON.parse(localStorage.getItem("token"));
  //   if (x == null) {
  //     navigate("/login");
  //   }
  // }, []);
  // console.log(searchInput);
  
  // const inputEvent = (event) => {
  //   const searching =event.target.value;
  //   const abc = searchInput.filter((value)=>{
  //     return value.name.startsWith(searching);
  //     }
  //   ); 
  //   setOnChange(abc);
  // }
  const [onChange,setOnChange]= useState({})
  const [apiData,setApiData] = useState([]) // for api 
  const [search,setSearch] = useState('') 
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    axios.post('https://food-app-hai.herokuapp.com/api/user/getAllProducts',{search : search},{ headers: {"authorization" : `Bearer ${token}`} })
    .then((responce)=>{
        setApiData(responce?.data?.data?.products)
      }).catch(error=>{
      console.log(error)
    })
    if (token == null) {
      navigate("/login");
    }
  }, [search]);
  
  const inputEvent = (event) => {
    const searching =event.target.value;
    setSearch(searching)
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <>
      <div className="deshboard">
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-1 ">
          <div className="container-fluid">
            <div className=" navbar-collapse justify-content-between d-flex">
              <button className="navbar-toggle  d-md-block d-none" type="button">
                <img src={list_icon} alt="" />
              </button>
              <div className="d-flex align-items-center">
                <input className="search"  name="firstName" placeholder="Enter Your Name" onChange={inputEvent}/>
              </div>
              <div className="main_logo">
                <img src={logo} alt="" />
              </div>
              <div className="admin" onClick={() => logOut()}>
                <span>log out </span> <img src={admin_image} alt="" />
              </div>
            </div>
          </div>
        </nav>

        <section>
          <div className="container-fluid p-0">
            <div className="d-flex">
              <div className="bg-light side_bar">
                <div className="left_side">
                  <NavLink to="/dashboard/home">
                    <div id="dashboard" className="border_class d-flex justify-content-center abc">
                      <div className=" d-flex align-items-center justify-content-center flex-column nunito">
                        <i className="fa-solid fa-house mb-2"></i>
                        PRODUCTS
                      </div>
                    </div>
                  </NavLink>

                  <NavLink to="/dashboard/about">
                    <div id="users" className=" border_class d-flex justify-content-center abc" >
                      <div className=" d-flex align-items-center justify-content-center flex-column nunito">
                        <i className="fas fa-shopping-cart mb-2"></i>
                        CARTS
                      </div>
                    </div>
                  </NavLink>

                  <NavLink to="/dashboard/contect">
                    <div id="users" className=" border_class d-flex justify-content-center abc" >
                      <div className="d-flex align-items-center justify-content-center flex-column nunito">
                        <i className="fab fa-first-order fa-x mb-2"></i>
                        FAVOURITE
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="dashboard_body p-5">
                <div className="row">
                  <div className="col-12">
                      <Routes>
                        <Route path="/" element={<Home property={onChange} apiData={apiData} />} />
                        <Route path="/home" element={<Home property={onChange} apiData={apiData}/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/contect" element={<Contect />} />
                        <Route path="/order" element={<OrderPopUp />} />
                      </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeskBoard;
