import axios from "axios";

const fetch = selectedCategories =>
  axios.get("/posts", { params: { categories: selectedCategories } });
const create = payload => axios.post("/posts", { post: payload });
const show = slug => axios.get(`/posts/${slug}`);

const postsApi = { fetch, create, show };

export default postsApi;
