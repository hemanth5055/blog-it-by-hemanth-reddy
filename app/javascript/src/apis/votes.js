import axios from "axios";

const updateVote = ({ postId, voteType }) =>
  axios.patch("/votes", {
    vote_update: {
      post_id: postId,
      vote_type: voteType,
    },
  });

export const votesApi = { updateVote };
