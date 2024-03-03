import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRequest = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_API_KEY;

  const url = process.env.REACT_APP_BASE_URL;



  const request = async (
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    restaurantName,
    country,
    restaurantRole,
    reistyUserRole
  ) => {
    setError(null);
    setIsPending(true);
    setSuccess(false);

    // create user

    try {
      const item = {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        restaurantName,
        country,
        restaurantRole,
        reistyUserRole,
      };
      const result = await fetch(`${url}/waitlist/submit_request`, {
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
        setError(null);
        setIsPending(false);
        setSuccess(true);
      } else {
        setError(res.errorMessage);
        setIsPending(false);
      }
    } catch (res) {
      console.log("Sammy", res);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, request, success };
};
