import { getDatabase, push, ref, remove, set, update } from "firebase/database";

import { toastSuccessNotify } from "./toastNotify";

export const addBlog = (blogValue) => {
  const db = getDatabase();
  const blogRef = ref(db, "blog/");
  const newBlogRef = push(blogRef);

  set(newBlogRef, blogValue);
};

export const deleteBlog = (id) => {
  const db = getDatabase();
  //   const userRef = ref(db, "user/");
  remove(ref(db, "blog/" + id));
  toastSuccessNotify("Deleted Successfully");
};

export const upDateBlog = (id, data) => {
  const db = getDatabase();
  const updates = {};
  updates["blog/" + id] = data;
  return update(ref(db), updates);
};

export const deleteOneBlog = (id) => {
  const db = getDatabase();
  // const userRef = ref(db, 'blogs');
  remove(ref(db, "blog/" + id));
};
