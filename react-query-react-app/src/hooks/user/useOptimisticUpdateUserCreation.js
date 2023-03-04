import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../../utils/queryKeyFactories";
import { createUser } from "../../api/userAPI";

const useOptimisticUpdateUserCreation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    retry: 0,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.all() }),
    onMutate: async (user) => {
      await queryClient.cancelQueries({ queryKey: userKeys.all() });

      const previousUsers = queryClient.getQueryData(userKeys.all());

      queryClient.setQueryData(userKeys.all(), (prevData) => [
        user,
        ...prevData,
      ]);

      return { previousUsers };
    },
    onError: (error, user, context) => {
      queryClient.setQueryData(userKeys.all(), context.previousUsers);
    },
  });
};

export default useOptimisticUpdateUserCreation;
