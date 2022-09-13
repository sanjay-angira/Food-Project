import React, { useEffect,useState } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';



const About = () => {
  const [getAllCart,setGetAllCart] = useState([])
  const [total,setTotal] =useState()
  const [address,setAddress] = useState();
  const navigatePopUp = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(()=>{
      axios.get("https://food-app-hai.herokuapp.com/api/user/getAllCarts",{ headers: {"authorization" : `Bearer ${token}`} })
        .then((responce)=>{
          setGetAllCart(responce.data.data.results.items)
          console.log(responce.data.data.results)
          setTotal(responce.data.data.results.total)
        }).catch(error=>{
        console.log(error)
      })
  },[])
  
  const removeToCart = (removeId) => {
    axios.delete(`https://food-app-hai.herokuapp.com/api/user/removeItemsFromCart/${removeId}`,{ headers: {"authorization" : `Bearer ${token}`} })
      .then((responce)=>{
      setGetAllCart(responce.data.data.items)
      setTotal(responce.data.data.total)
      }).catch(error=>{
      console.log(error)
    })
  }

  const clearCart = () => {
    axios.delete(`https://food-app-hai.herokuapp.com/api/user/clearCart`,{ headers: {"authorization" : `Bearer ${token}`} })
      .then((responce)=>{
      setGetAllCart(responce.data.data.items)
      setTotal(responce.data.data.total)
      }).catch(error=>{
      console.log(error)
    })
  }


  
  const placeOrder =() => {

    const token = JSON.parse(localStorage.getItem('token'));
    axios.post('https://food-app-hai.herokuapp.com/api/user/addAddress',{},{ headers: {"authorization" : `Bearer ${token}`} })
    .then((responce)=>{
        setAddress(responce)
      }).catch(error=>{
      console.log(error)
    })
    if(getAllCart.length>0){
      navigatePopUp("/dashboard/order")
    }else{
      navigatePopUp('/dashboard/about')
      alert("please add some cart")
    }    
  }


  const addMoreCart = (productId) =>  {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post(
        "https://food-app-hai.herokuapp.com/api/user/addToCart",
        { productId: productId },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((responce) => {
        setGetAllCart(responce.data.data.items);
      }).catch((error) => {
        console.log(error);
      }
    );
  }


    
    
    
    
    
    
    
    
    
    

  return (
    <>

      <div className='row m-2'>
        <div className='col-10'>
          <div className="row">
            {
              getAllCart.map((value,index)=>{
              return(
                <div className="col-3 my-2 card py-4 d-flex flex-column align-items-center" key={index}>
                  <h3>{value.quantity}</h3>
                  <img className="card-img-top" src={value.image} alt="Card image cap"/>
                  <h4>{value.productName}</h4>
                  <h1><i className="fas fa-rupee-sign"></i>{value.price}</h1>
                  <h4>Sub.Total {value.subTotal}</h4>
                  <div className="card-body">
                    <p className="card-text">{value.description}</p>
                  </div>
                  <div className='d-flex'>
                    <button className="btn btn-primary remove-add" onClick={()=>removeToCart(value._id)}>Remove Item</button>
                    <Button variant="contained" color="secondary" className='remove-add' onClick={()=>addMoreCart(value._id)}><AddBoxIcon/>  </Button>                
                  </div>
                </div>
              )
              })
            }
          </div>
        </div>
        <div className='col-2'>
          <div className='row'>
            <div className='col-12 my-2 mx-4 cart-details'>
              <h2>Total : {total}</h2>
              <button className="btn btn-secondry"  onClick={()=>clearCart()}>Clear Cart</button>
              <button className="btn btn-danger" onClick={placeOrder} >Place Your Order</button>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default About
