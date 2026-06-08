import authApi from "apis/auth";
import { useMutation } from "react-query";

export const useCreateSession = () => useMutation(authApi.login);
