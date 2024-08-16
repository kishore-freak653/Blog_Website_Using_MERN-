import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Home.css"; // Import the updated CSS file

function Home() {
  const [posts, setPosts] = useState([]);





































  return (
    <div>
      <h1>Latest Posts</h1>
      <div className="posts_container">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <Link to={`/blog/${post._id}`}>
              <img
                src={`http://localhost:8000/${post.thumbnail}`}
                alt={post.title}
              />
              <div className="post_text">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button className="btn-primary">Read More</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
