import axios from "axios";

const fetch = selectedCategories =>
  axios.get("/posts", { params: { categories: selectedCategories } });
const create = payload => axios.post("/posts", { post: payload });
const show = slug => axios.get(`/posts/${slug}`);
const destroy = slug => axios.delete(`/posts/${slug}`);
const update = (slug, payload, isPostBeingPublished) => {
  if (isPostBeingPublished) {
    return axios.put(`/posts/${slug}`, { post: { ...payload, status: 1 } });
  }

  return axios.put(`/posts/${slug}`, { post: { ...payload, status: 0 } });
};

const fetchUserPosts = () => axios.get("/posts/mypost");
const postsApi = { fetch, create, show, destroy, update, fetchUserPosts };

export default postsApi;
