import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './ForgetPassword.css';


export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    setIsSubmitted(true);
  };

  return (
    <div className="forget-password-container">
      <h2>Forgot Password</h2>
      {isSubmitted ? (
        <div className="message">
          Please check your email for instructions to reset your password.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group">
            <h5><FontAwesomeIcon icon={faEnvelope} />  Email:</h5>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="input-icon">
                
              </div>
            </div>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ForgetPassword;
