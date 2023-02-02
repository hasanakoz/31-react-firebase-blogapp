import React, { useContext, useState } from "react";
import { BlogForm } from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify } from "../utils/toastNotify";
import { BlogContext } from "../context/BlogContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import { addBlog } from "../utils/dbfunctions";

const NewBlog = () => {
  const { currentUser } = useContext(AuthContext);
  const [newBlog, setNewBlog] = useState({
    author: currentUser.email,
    title: "",
    content: "",
    get_comment_count: 0,
    get_like_count: 0,
    image: "",
    published_date: Date.now(),
  });
  const navigate = useNavigate();

  const newBlogHandler = (e) => {
    e.preventDefault();
    try {
      addBlog(newBlog);
      // console.log(newBlog);
      navigate("/");
      toastSuccessNotify("Blog added successfully!");
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log("currentBlogs", currentBlogs);

  return (
    <div style={{ marginTop: 90 }}>
      <BlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        newBlogHandler={newBlogHandler}
      />
    </div>
  );
};

export default NewBlog;
