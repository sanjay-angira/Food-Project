import React, { useState } from "react";
import axios from "axios";

function Home({ property, apiData }) {
  const [addCart, setAddCart] = useState();

  const addToCart = (productId) => {

    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post(
        "https://food-app-hai.herokuapp.com/api/user/addToCart",
        { productId: productId },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((responce) => {
        setAddCart(responce.data.data.items);
      }).catch((error) => {
        console.log(error);
      }
    );
    alert(`Add item`)
  };

  return (
    <>
      {/* <table className="table table-hover table-dark table-striped~">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          {property?.length > 0
            ? property.map((value, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{value?.id}</th>
                    <td>{value?.name}</td>
                    <td>{value?.email}</td>
                    <td>{value?.address?.city}</td>
                    <td>{value?.company?.name}</td>
                  </tr>
                );
              })
            : apiData.map((value, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{value?.id}</th>
                    <td>{value?.name}</td>
                    <td>{value?.email}</td>
                    <td>{value?.address?.city}</td>
                    <td>{value?.company?.name}</td>
                  </tr>
                );
              })}
        </tbody>
      </table> */}

      <div className="row m-3">
        {property.length > 0
          ? property.map((value, index) => {
              return (
                <div
                  className="brand col-3 my-2 card py-4 d-flex flex-column align-items-center"
                  key={index}
                >
                  <h3>{value.brand}</h3>
                  <img
                    className="card-img-top"
                    src={value.image}
                    alt="Card image cap"
                  />
                  <h4>{value.productName}</h4>
                  <h1>
                    <i className="fas fa-rupee-sign"></i> {value.price}
                  </h1>
                  <div className="card-body">
                    <p className="card-text">{value.description}</p>
                    <button type="button" className="btn btn-primary">
                      Primary
                    </button>
                  </div>
                </div>
              );
            })
          : apiData.length > 0 &&
            apiData.map((value, index) => {
              return (
                <div
                  className="col-3 my-2 card py-4 d-flex flex-column align-items-center"
                  key={index}
                >
                  <h3>{value.brand}</h3>
                  <img
                    className="card-img-top"
                    src={value.image}
                    alt="Card image cap"
                  />
                  <h4>{value.productName}</h4>
                  <h1>
                    <i className="fas fa-rupee-sign"></i> {value.price}
                  </h1>
                  <div className="card-body">
                    <p className="card-text">{value.description}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addToCart(value._id)}
                  >
                    ADD TO CART
                  </button>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default Home;
