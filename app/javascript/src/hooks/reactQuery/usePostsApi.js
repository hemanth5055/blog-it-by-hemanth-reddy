import { useMutation, useQuery } from "react-query";

import postsApi from "../../apis/posts";
import { QUERY_KEYS } from "../../constants/query";

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
  });

export const useFetchPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: () => postsApi.fetch(),
  });

export const useCreatePost = () => useMutation(postsApi.create);
