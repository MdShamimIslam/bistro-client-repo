import React from "react";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Components/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit,reset} = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    fetch(img_hosting_url,{
      method:'POST',
      body:formData
    })
    .then(res => res.json())
    .then(imgRes => {
      if(imgRes.success){
        const imgURL = imgRes.data.display_url;
        const {name, price, recipe, category} = data;
        const newMenu = {
          name, 
          price:parseFloat(price),
           recipe, 
           category, 
           image:imgURL
        };
        
        axiosSecure.post('/menu',{newMenu})
        .then(data => {
          if(data.data.insertedId){
            reset();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your menu added successfully',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })

      }
    })

}

  return (
    <div className="mt-4 w-full lg:ml-20 p-4">
      <Helmet>
        <title>Bistro-boss || Add item </title>
      </Helmet>
      <SectionTitle
        subHeading="What's new?"
        heading="ADD AN ITEM"
      ></SectionTitle>
      
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Recipe name*</span>
          </label>
          <input
            type="text"
            
            {...register("name", { required: true })}
            placeholder="Recipe name"
            className="input input-bordered w-full "
          />
        </div>
       <div className="flex gap-5">
       <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
            <option disabled >
            Pick One
            </option>
            <option>Salad</option>
            <option>Pizza</option>
            <option>Deshi</option>
            <option>Soup</option>
            <option>Dessert</option>
            <option>Drinks</option>
          </select>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            type="number"
          
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered w-full "
          />
        </div>
       </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details*</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-36"
            
            {...register("recipe", { required: true })}
            placeholder="Recipe Details"
          ></textarea>
        </div>
        <div className="form-control w-full  mt-2">
        <label className="label">
            <span className="label-text">Add image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <input className="btn btn-primary btn-sm mt-5" type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItem;
