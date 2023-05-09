import { useState, useEffect } from 'react';

function LoginTitle() {
  const [title, setTitle] = useState('Login'); // set initial title state

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTitle('Welcome'); // update title state after a delay
    }, 500);
    return () => clearTimeout(timerId); // clear timeout on unmount
  }, []);

  return <span className="login_title">{title}</span>;
}
