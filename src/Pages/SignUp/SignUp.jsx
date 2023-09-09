import React, { useContext } from "react";
import SignUpImg from "../../assets/others/authentication2.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { authContext } from "../../Providers/AuthProvider";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(authContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);

      updateUserProfile(data.name, data.photo).then(() => {
        reset();
        Swal.fire({
          title: "User Created Successfully",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate('/')
      });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro-boss || Sign Up</title>
      </Helmet>
      <div className="hero my-24">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div className="text-center lg;w-3/4 md:w-1/2 lg:text-left">
            <img src={SignUpImg} alt="" />
          </div>

          <div className="card md:w-1/2 shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center my-5">
              Sign Up now!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  name="photo"
                  placeholder="photo url"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-600">Photo field is required</span>
                )}
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    maxLength: 10,
                    minLength: 6,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />

                {errors.password?.type === "required" && (
                  <span className="text-red-600">
                    Password field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be at least 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password less than 10 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Please one uppercase and one lowercase and special character
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center mb-10">
              Already have an Account ?{" "}
              <Link className="font-semibold text-orange-400" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
