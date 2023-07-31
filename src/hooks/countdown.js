import { useState, useEffect, useRef } from 'react';

export function useCountdown(callback) {
  const [count, setCount] = useState(0);
  const ref = useRef(null); // 用来在组件销毁之前保存定时器

  function start(startCount) {
    setCount(startCount);
    ref.current = setInterval(() => {
      setCount((_) => _ - 1);
    }, 1000);
  }

  useEffect(() => {
    if (count === 0) {
      ref.current && clearInterval(ref.current);
      ref.current = null;
      callback && callback();
    }
  }, [count]);

  useEffect(() => {
    return () => {
      ref.current && clearInterval(ref.current);
      ref.current = null;
    };
  }, []);

  return {
    count,
    start
  };
}
