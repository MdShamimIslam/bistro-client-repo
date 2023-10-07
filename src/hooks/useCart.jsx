
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../Providers/AuthProvider";
// import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const {user} = useContext(authContext)
    const token = localStorage.getItem('access-token');
    // const [axiosSecure] = useAxiosSecure();

    const { data: cart=[], refetch} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async ()=>{
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`,
            {
                headers:{
                    authorization : `bearer ${token}`
                }
            }
            )
            return res.json();
        }

        // queryFn: async ()=>{
        //     const res = await axiosSecure(`/carts?email=${user?.email}`);
        //     console.log("resss---",res);
        //     return res.data;
        // }
        
      });
      return [cart,refetch];
};

export default useCart;