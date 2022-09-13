import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderPopUp = () => {
  const [data, setData] = useState({});
  const inputEvent = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  const onSubmit = (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(data)
    axios.post(
      "https://food-app-hai.herokuapp.com/api/user/addAddress",data, { headers: { authorization: `Bearer ${token}` } }
    ).then((responce) => {
      console.log(responce);
    }).catch((error)=>{
      console.log(error)
    });

  };
 
  return (
    <>
      <div className="row ">
        <div className="col-12 PopUpBody">
          <div className="popup-content">
            <div className="form-width">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label for="City">City</label>
                  <input className="form-control" id="City" name="City" placeholder="Enter City Name" onChange={inputEvent} />
                </div>
                <div className="form-group">
                  <label for="State">State</label>
                  <input className="form-control" id="State" name="State" placeholder="Enter State Name" onChange={inputEvent}/>
                </div>
                <div className="form-group">
                  <label for="Country">Country</label>
                  <input className="form-control" id="Country" name="Country" placeholder="Enter State Name" onChange={inputEvent}/>
                </div>
                <div className="form-group">
                  <label for="Zip_code">Zip COde</label>
                  <input className="form-control" id="Zip_code" name="ZipCode" placeholder="Enter State Name" onChange={inputEvent}/>
                </div>
                <div className="d-flex justify-content-around">
                  <button className="btn btn-danger address_button">Continue</button>
                </div>
              </form>
            </div>
            {/* <div className="d-flex justify-content-around" style={{ width: "100%" }}><h3></h3><h3></h3></div>
            <div className="d-flex justify-content-around" style={{ width: "100%" }}><h3></h3><h3></h3></div>
            <div className="d-flex justify-content-around" style={{ width: "100%" }}><h3></h3><h3></h3></div>
            <div className="line"></div>
            <div className="d-flex justify-content-around" style={{ width: "100%" }}><h1>Total</h1><h1>fsfsf</h1></div>
            <div>
              <button className="btn btn-danger">Payment</button>{" "}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPopUp;
