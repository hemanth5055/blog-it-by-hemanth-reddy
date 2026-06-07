import { useMutation } from "react-query";

import { votesApi } from "../../apis/votes";

export const useUpdateVote = () => useMutation(votesApi.updateVote);
