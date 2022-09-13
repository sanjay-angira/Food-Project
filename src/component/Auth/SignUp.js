import React, { useState} from "react";
import "./SignUP_LogIn.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({"countryCode":"+91"});
  const navigateTo = useNavigate()
  const inputEvent = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    console.log(data);
    event.preventDefault();
    axios.post(
      "https://food-app-hai.herokuapp.com/api/user/register",data
    )
    .then((responce) => {
      console.log(responce);
    }).catch((error)=>{
      console.log(error)
    });

    // const arr = JSON.parse(localStorage.getItem("testArr")) || [];
    // arr.filter((value) => {
    //   return value.userName===data.userName?1:value.email===data.email?1:value.mobile===data.mobile?1:0;
    // }).length === 0 && (arr.push(data));
    // localStorage.setItem("testArr", JSON.stringify(arr));
    // event.target.reset();
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
          <div className="sign_up_content">
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
              <label>First Name :</label>
              <input
                type="text"
                className="input_area"
                name="firstname"
                onChange={inputEvent}
              />
            </div>
            <div className="input_areas">
              <label>Email id :</label>
              <input
                type="text"
                className="input_area"
                name="email"
                onChange={inputEvent}
              />
            </div>
            <div className="input_areas">
              <label>Mobile :</label>
              <input
                type="text"
                className="input_area"
                name="phone"
                onChange={inputEvent}
              />
            </div>
            <div className="input_areas">
              <label>Password :</label>
              <input              
                type="password"
                className="input_area"
                name="password"
                value={data.password}
                onChange={inputEvent}
              />
            </div>
            <div className="submit_button">
              <button type="submit">Sign Up</button>
              <NavLink to="/login">
                <h4 className="sign-link">
                  Already sign up ? <span>log in.</span>
                </h4>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

// const inputEvent = (event) => {
//   // console.log(event.target.value);
//   const value=event.target.value;
//   const name=event.target.name;
//   setData((preValue)=>{
//     return {
//       ...preValue,
//       [name]:value
//     }
//     // console.log(preValue)
//     // if(name==='userName'){
//     //   return{
//     //     userName:value,
//     //     email:preValue.email,
//     //     mobile:preValue.mobile,
//     //     password:preValue.password
//     //   }
//     // }else if(name==='email'){
//     //   return{
//     //     userName:preValue.userName,
//     //     email:value,
//     //     mobile:preValue.mobile,
//     //     password:preValue.password
//     //   }
//     // }else if(name==='mobile'){
//     //   return{
//     //     userName:preValue.userName,
//     //     email:preValue.email,
//     //     mobile:value,
//     //     password:preValue.password
//     //   }
//     // }else if(name==='password'){
//     //   return{
//     //     userName:preValue.userName,
//     //     email:preValue.email,
//     //     mobile:preValue.mobile,
//     //     password:value
//     //   }
//   })
// };
