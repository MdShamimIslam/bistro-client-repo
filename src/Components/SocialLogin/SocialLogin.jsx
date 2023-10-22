import React from "react";
import { useContext } from "react";
import { authContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleLogin } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const user = result.user;
      const saveUser = { name: user.displayName, email: user.email };
      fetch("https://bistro-boss-restaurant-server-sepia.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div>
      <div className="divider"></div>
      <div className="text-center my-5">
        <button
          onClick={handleGoogleLogin}
          className="btn btn-circle btn-outline"
        >
          <i className="fa-brands fa-google"></i>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
