import authApi from "apis/auth";
import { useMutation } from "react-query";

export const useCreateUser = () => useMutation(authApi.signup);
