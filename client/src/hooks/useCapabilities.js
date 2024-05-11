import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCapabilities = (axiosPrivate) => {
  const [capabilities, setCapabilities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const source = axiosPrivate.CancelToken.source();

    const getCapabilities = async () => {
      try {
        const response = await axiosPrivate.get('/users/capabilities', {
          cancelToken: source.token,
        });
        if (isMounted) {
          setCapabilities(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request:', error.message);
        } else {
          console.error(error);
        }
      }
    };
    getCapabilities();
  }, [axiosPrivate]);

  return { capabilities, loading };
};