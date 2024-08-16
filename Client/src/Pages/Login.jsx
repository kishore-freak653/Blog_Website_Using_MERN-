import {React,useState} from 'react'
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const[input,setInput] = useState({
    email :"",
    password:"",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/user/login",
        input
      );
      alert(res.data.message);
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("username",res.data.name)
      console.log(res.data)
      navigate("/");
    } catch (error) {
      alert("Error Posting Data");
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="border border-danger 40-w p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email" // Use 'email' type for validation
              placeholder="Enter email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div>
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <p className="text-end mt-3">
            New User? <Link to="/register">Register Account</Link>
          </p>
        </form>
      </div>
    </div>
  );

}

export default Login