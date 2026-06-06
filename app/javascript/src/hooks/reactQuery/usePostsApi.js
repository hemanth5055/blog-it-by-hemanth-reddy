import { useMutation, useQuery } from "react-query";

import postsApi from "../../apis/posts";
import { QUERY_KEYS } from "../../constants/query";

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
    retry: false,
  });

export const useFetchPosts = filters =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, filters],
    queryFn: () => postsApi.fetch(filters),
    retry: false,
  });

export const useFetchUserPosts = filters =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER, filters],
    queryFn: () => postsApi.fetchUserPosts(filters),
    retry: false,
  });

export const useCreatePost = () => useMutation(postsApi.create);

export const useUpdatePost = () =>
  useMutation(({ slug, payload, isPostBeingPublished, isQuiet }) =>
    postsApi.update(slug, payload, isPostBeingPublished, isQuiet)
  );

export const useDeletePost = () => useMutation(postsApi.destroy);

export const useBulkDeletePost = () =>
  useMutation(postsApi.bulkDeleteUserPosts);

export const useBulkUpdatePosts = () =>
  useMutation(postsApi.bulkUpdateUserPosts);
