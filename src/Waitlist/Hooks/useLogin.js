import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { getRestuarents } from "../../store/restaurantSlice";



const apiKey = process.env.REACT_APP_API_KEY;

const baseUrl = process.env.REACT_APP_BASE_URL;



export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  //   const url = "https://reisty-ap1.azurewebsites.net/api/auth/create_owner";
  const request = async (

    emailAddress,

    password,

  ) => {
    setError(null);
    setIsPending(true);
    setSuccess(false);

    // create user

    try {
      const item = {
    
        emailAddress,
 
        password,

      };
      const result = await fetch(`${baseUrl}/auth/login_restaurant_owner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ApiKey: apiKey,
          Accept: "text/plain",
        },
        body: JSON.stringify(item),
      });
      const res = await result.json();
      console.log(res);

        if (res.status) {
          if (res.has_restaurant === false) {
               
            navigate("/dashboard/restaurantprofile");
          } else {
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res?.result[0])
                );
            navigate("/dashboard/select");
          }

            dispatch(setUser(res))
            dispatch(getRestuarents())
                 localStorage.setItem(
                   "userInfo",
                   JSON.stringify(res?.result[0])
                 );
        setError(false);
        setIsPending(false);
        setSuccess(true);
      } else {
        setError(true);
        setIsPending(false);
        setMessage(res?.error_message);
        console.log(res?.error_message);
      }
    } catch (res) {
      setError(true);
       setMessage(res);
      console.log("Sammy", res);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, request, success, message };
};
