import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file,setFile] = useState([])
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/auth/get/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAllCategories(); // Call the function to fetch categories
  }, []);


//Creating  a formData 
const formdata = new FormData();
formdata.append("title",input.title);  
formdata.append("category", input.category);  
formdata.append("description",input.description);  
formdata.append("thumbnail", file);  

const handleBlogSubmit = async(e) =>{
e.preventDefault();
try {
  const res = await axios.post(
    "http://localhost:8000/api/auth/add/blog",
    formdata,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        <form onSubmit={handleBlogSubmit}>
          <h3>Add Blog</h3>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter the Title here"
              name="title"
              id="title"
              value={input.title}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={input.category}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Enter the Description"
              name="description"
              id="description"
              value={input.description}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={(e)=>setFile(e.target.files[0])}
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
