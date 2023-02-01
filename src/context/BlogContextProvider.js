import { getDatabase } from "firebase/database";
import React, { useContext, createContext, useState, useEffect } from "react";

export const BlogContext = React.createContext();

const BlogContextProvider = () => {
  const [currentBlogs, setCurrentBlogs] = useState();

  useEffect(() => {
    const db = getDatabase(firebase);
    const blogRef = ref(db, "user/");

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
