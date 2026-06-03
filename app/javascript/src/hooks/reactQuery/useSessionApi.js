import { useMutation } from "react-query";

import authApi from "../../apis/auth";

export const useCreateSession = () => useMutation(authApi.login);
