import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";


const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3002/signup",
        form,
        { withCredentials: true }
      );

      login();

      navigate("/");
      
      // window.location.href = "http://localhost:5174"; 
    
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <>
      <h2 className="mt-5 mb-3 text-center" style={{ marginLeft: "-100px" }}>
        Signup Form
      </h2>
      

      <br />
      <div className="row mt-3">
        <div className="col-6 offset-3">
       
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3 w-75 mx-5">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="form-control"
                  id="username"
                  required
                />
              </div>
            </div>
            <div className="mb-3 w-75 mx-5">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  required
                />
              </div>
            </div>
            <div className="mb-3 w-75 mx-5">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  required
                />
              </div>
            </div>

            <br />
            <button className="btn btn-primary mx-5">SignUp</button>
          </form>
          {error && <div className="text-danger mx-5 mt-5" >{error}</div>}
        </div>
      </div>
      <br />  <br />
      <br />  <br />
      <br />  <br />
      <br />  <br />
    </>
  );
};

export default Signup;
