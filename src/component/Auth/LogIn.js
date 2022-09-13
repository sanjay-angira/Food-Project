import React, { useState} from "react";
import "./SignUP_LogIn.css";
import { NavLink,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const Log_in = () => {
  // const [formData, updateFormData] = useState({});
  // const navigateTo = useNavigate();
  // const inputEvent = (e) => {
  //   updateFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value.trim(),
  //   });
  // };

  // const onSubmit = (e) => {
    // e.preventDefault();
    // e.target.reset();
    // const logInData = JSON.parse(localStorage.getItem("testArr"));
    // const solve = logInData.filter((value) => {
    //   return (
    //     value.userName === formData.userName &&
    //     value.password === formData.password
    //   );
    // });

    // if (solve.length === 1) {
    //   let x = Math.floor((Math.random() * 10)+1);
    //   localStorage.setItem('token',JSON.stringify(x))
    //   alert("login successful");
    //   navigateTo('/dashboard');
    // } else {
    //   alert("user not found");
    // }
  // };
  // useEffect(()=>{
  //   const x =JSON.parse(localStorage.getItem('token'))
  //   if(typeof(x) === 'number' ){
  //     navigateTo('/dashboard');
  //   }
  // },[])



  const [formData, updateFormData] = useState({});
  const navigateTo = useNavigate();
  const inputEvent = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(
      "https://food-app-hai.herokuapp.com/api/user/login",formData
    )
    .then((responce) => {
      localStorage.setItem('token',JSON.stringify(responce.data.data.accessToken))
      navigateTo('/dashboard');
    }).catch((error)=>{
      console.log(error)
    });
  };
  useEffect(()=>{
    const x =JSON.parse(localStorage.getItem('token'))
    if(typeof(x) === 'string' ){
      navigateTo('/dashboard');
    }
  },[])
   return (
    <>
      <div className="sign_up_body">
        <form onSubmit={onSubmit}>
          <div className="log_in_content">
            <div className="input_areas">
              <label>User Name :</label>
              <input
                type="text"
                className="input_area"
                name="username"
                onChange={inputEvent}
              />
            </div>
            <div className="input_areas">
              <label>Password :</label>
              <input
                type="password"
                className="input_area"
                name="password"
                onChange={inputEvent}
              />
            </div>
            <div className="submit_button">
              <button type="submit">Log in</button>
              <NavLink to="/">
                <h4 className="sign-link" >
                  New user ? <span>Sign up.</span>
                </h4>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Log_in;
