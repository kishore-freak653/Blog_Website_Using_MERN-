import React,{useState}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {
  const navigate = useNavigate();  
  const[category,setCategory] = useState({
    title : "",
  })

  const handleSubmitCategory = async(e) =>{
    e.preventDefault();
    try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/add/categories",
          category,
          {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert(res.data.message);
        navigate('/');
    } catch (error) {
       alert("Error Posting Data");
       console.log(error.response?.data?.message || error.message);
    }
  
  }
  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="border border-danger 40-w p-5 rounded bg-white">
        <form onSubmit={handleSubmitCategory}>
          <h3>Add Category</h3>
          <div className="mb-3">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              placeholder="Enter the Title here "
              name="title"
              value={category.title}
              onChange={(e)=>setCategory({...category,[e.target.name]:e.target.value})}
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button type='submit' className="btn btn-success">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory