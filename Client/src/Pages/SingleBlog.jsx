import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { useParams ,useNavigate} from 'react-router-dom'
const SingleBlog = () => {
  const {id} = useParams();
  const navigate = useNavigate()

  const[blog,setBlog] = useState({

  })

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth//get/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <>
      <div className="container shadow my-2">
        <div className="col-md-12">
          <div className="row">
            <h1 className="my-2">{blog.title}</h1>
            <img
              src={`http://localhost:8000/${blog.thumbnail}`}
             className='img img-responsive img-round
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             ced my-2'
             alt=''
            />
            <p className="my-3">{blog.description}</p>
          </div>
        </div>
        <button onClick={()=>navigate('/')}className="btn btn-primary">Back to Post</button>
      </div>
    </>
  );
}

export default SingleBlog