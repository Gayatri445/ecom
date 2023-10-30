import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    makeApiCall();
  }, [endpoint]);

  const makeApiCall = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchDataFromApi(endpoint);
      setData(res);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  return { data,isLoading,error };
};

export default useFetch;
