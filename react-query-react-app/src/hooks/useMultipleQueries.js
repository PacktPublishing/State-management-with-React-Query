import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../utils/queryKeyFactories";
import { getUser } from "../api/userAPI";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  return await getUser(username);
};

const useMultipleQueries = () => {
  const { data: queryOneData } = useQuery({
    queryKey: userKeys.withUsername("userOne"),
    queryFn: fetchData,
  });
  const { data: queryTwoData } = useQuery({
    queryKey: userKeys.withUsername("userTwo"),
    queryFn: fetchData,
  });
  const { data: queryThreeData } = useQuery({
    queryKey: userKeys.withUsername("userThree"),
    queryFn: fetchData,
  });

  return { queryOneData, queryTwoData, queryThreeData };
};

export default useMultipleQueries;
