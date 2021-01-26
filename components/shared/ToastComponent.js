import React, { useState, useEffect } from 'react';

const ToastComponent = ({ message, type }) => {
  const [showToast, setShowToast] = useState(true)
  const handleClick = () => setShowToast(false)
  useEffect(() => {
    console.log('entra por aquí');
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!');
      setShowToast(false)
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showToast &&
        <div className="callout-container" onClick={handleClick} >
          <div className={"callout " + type} data-closable>
            <ul>{message}</ul>
          </div>
        </div>
      }
    </>
  );
}

export default ToastComponent;
