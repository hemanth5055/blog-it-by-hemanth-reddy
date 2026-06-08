import { votesApi } from "apis/votes";
import { useMutation } from "react-query";

export const useUpdateVote = () => useMutation(votesApi.updateVote);
