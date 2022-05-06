import { useEffect } from 'react';

const useDebounce = (value: any, delay: number, callback: () => void) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
};
export default useDebounce;
