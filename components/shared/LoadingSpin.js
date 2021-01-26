import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LoadingSpin = () => {
  return (
    <>
      <p className="loading">
        <FontAwesomeIcon icon={faSpinner} spin width="30" />
      </p>
    </>
  );
}

export default LoadingSpin;
