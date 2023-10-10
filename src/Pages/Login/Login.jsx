import React, { useContext, useEffect, useState } from "react";
import loginImg from "../../assets/others/authentication1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { authContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(authContext);
  const [disabled, setDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    

    signIn(email, password).then((result) => {
      const user = result.user;
      
      Swal.fire({
        title: 'User Login Successfully',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      navigate(from,{replace:true})
    });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha = e.target.value;

    if(validateCaptcha(user_captcha)){
      setDisabled(false);
    }
    else{
      setDisabled(true);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Bistro-boss || Login</title>
      </Helmet>
      <div className="hero my-36">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={loginImg} alt="" />
          </div>

          <div className="card md:w-1/2   shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center my-5">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <LoadCanvasTemplate />
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Please type your captcha"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={false}
                  className="btn btn-primary"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center">
              Create new Account ?{" "}
              <Link className="font-semibold text-orange-400" to="/signUp">
                Sign Up
              </Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
