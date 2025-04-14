import React from 'react';
import './Error.css';

const Error = () => {
    return (
        <div className="error-container">
            <div className="error-content text-center text-white">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3">Oops! The page you're looking for doesn't exist.</p>
            </div>
        </div>
    );
};

export default Error;
