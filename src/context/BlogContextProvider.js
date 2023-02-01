import { getDatabase, onValue, ref } from "firebase/database";
import React, { createContext, useState, useEffect } from "react";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [currentBlogs, setCurrentBlogs] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const blogRef = ref(db, "blog/");

    onValue(blogRef, (snapshot) => {
      const blogs = snapshot.val();
      const blogArray = [];

      for (let id in blogs) {
        blogArray.push({ id, ...blogs[id] });
      }

      setCurrentBlogs(blogArray);
    });
  }, []);

  return (
    <BlogContext.Provider value={currentBlogs}>{children}</BlogContext.Provider>
  );
};
