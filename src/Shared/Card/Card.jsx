import React, { useContext } from 'react';
import { authContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Card = ({item}) => {
  const {image,name,recipe,price,_id} = item;
  const {user} = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [,refetch]= useCart();

const handleAddToCart = ()=>{
  if(user && user.email){
    const orderItem = {image,name,price, menuId:_id, email:user.email};
    fetch('http://localhost:5000/carts',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(orderItem)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Food order added',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
  else{
    Swal.fire({
      title: 'You want to add food then go to Login',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Login Now'
    }).then((result) => {
      if (result.isConfirmed) {
       navigate('/login', {state:{from:location}})
      }
    })
  }
}


  return (
      <div className="card  bg-base-100 shadow-xl ">
         <p className='absolute right-0 mr-5 mt-5 p-3 rounded bg-black text-white'>${price}</p>
      <figure>
      
        <img className="w-[425px] h-[300px]" src={image} alt="Shoes" />
      </figure>
      <div className="card-body  flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
        <button onClick={()=> handleAddToCart(item)} className="btn btn-outline mt-10 border-0 border-b-4">Add to cart</button>
        </div>
      </div>
    </div>
      
    );
};

export default Card;