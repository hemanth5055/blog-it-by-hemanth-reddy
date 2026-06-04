import { useMutation, useQuery } from "react-query";

import postsApi from "../../apis/posts";
import { QUERY_KEYS } from "../../constants/query";

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
    retry: false,
  });

export const useFetchPosts = selectedCategories =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, selectedCategories],
    queryFn: () => postsApi.fetch(selectedCategories),
    retry: false,
  });

export const useCreatePost = () => useMutation(postsApi.create);
export const useUpdatePost = () =>
  useMutation(({ slug, payload, isPostBeingPublished }) =>
    postsApi.update(slug, payload, isPostBeingPublished)
  );
