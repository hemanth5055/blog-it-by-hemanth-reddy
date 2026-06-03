import { useMutation } from "react-query";

import authApi from "../../apis/auth";

export const useCreateUser = () => useMutation(authApi.signup);
