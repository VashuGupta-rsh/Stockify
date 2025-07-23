import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
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
      const res = await axios.post("http://localhost:3002/login", 
        form,
        { withCredentials: true }
      );
      

      login();

      navigate("/");

      // window.location.href = "http://localhost:5173/"; 
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
      <h2 className="text-center mt-5 mb-5" style={{ marginLeft: "-100px" }} >Login Form</h2>
      <br />
      <div className="row mt-3">
        <div className="col-6 offset-3">
          <form
           onSubmit={handleSubmit}
          >
            <div className="mb-3 w-75 mx-5">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                name="username"
                id="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 w-75 mx-5">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                className="form-control"
                required
              />
            </div>
            <br />
            <button className="btn btn-primary mx-5">Login</button>
          </form>
          {error && <div className="text-danger mx-5 mt-5" >{error}</div>}
        </div>
      </div>
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Login;
