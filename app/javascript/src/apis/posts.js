import axios from "axios";

const fetch = selectedCategories =>
  axios.get("/posts", { params: { categories: selectedCategories } });
const create = payload => axios.post("/posts", { post: payload });
const show = slug => axios.get(`/posts/${slug}`);
const destroy = slug => axios.delete(`/posts/${slug}`);
const update = (slug, payload, isPostBeingPublished, isQuiet) => {
  const url = isQuiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;
  if (isPostBeingPublished) {
    return axios.put(url, { post: { ...payload, status: 1 } });
  }

  return axios.put(url, { post: { ...payload, status: 0 } });
};

const fetchUserPosts = filters => axios.get("/myposts", { params: filters });
const bulkDeleteUserPosts = ids =>
  axios.delete("/myposts/bulk_delete", { params: { ids } });

const postsApi = {
  fetch,
  create,
  show,
  destroy,
  update,
  fetchUserPosts,
  bulkDeleteUserPosts,
};

export default postsApi;
