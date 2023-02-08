import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../utils/queryKeyFactories";
import { createUserFetch } from "./api/userAPI";

const useOptimisticUpdateUserCreation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFetch,
    retry: 3,
    onSettled: () => queryClient.invalidateQueries(userKeys.all),
    onMutate: async (user) => {
      await queryClient.cancelQueries(userKeys.all);

      const previousUsers = queryClient.getQueryData(userKeys.all);

      queryClient.setQueryData(userKeys.all, (prevData) => [user, ...prevData]);

      return { previousUsers };
    },
    onError: (error, user, context) => {
      queryClient.setQueryData(userKeys.all, context.previousUsers);
    },
  });
};

export default useOptimisticUpdateUserCreation;
