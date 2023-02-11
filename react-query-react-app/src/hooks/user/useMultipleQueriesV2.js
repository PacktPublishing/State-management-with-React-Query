import { useQueries } from "@tanstack/react-query";
import { userKeys } from "../../utils/queryKeyFactories";
import { getUser } from "../../api/userAPI";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  return await getUser(username);
};

const usernameList = ["userOne", "userTwo", "userThree"];

const useMultipleQueriesV2 = () => {
  const multipleQueries = useQueries({
    queries: usernameList.map((username) => {
      return {
        queryKey: userKeys.withUsername(username),
        queryFn: fetchData,
      };
    }),
  });

  return { multipleQueries }
};

export default useMultipleQueriesV2