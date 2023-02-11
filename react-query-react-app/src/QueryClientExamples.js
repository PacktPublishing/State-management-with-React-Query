import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUser, getUserWithFetch } from "./api/userAPI";
import { userKeys } from "./utils/queryKeyFactories";

const fetchData = async ({ queryKey, signal }) => {
  const { username } = queryKey[0];
  return await getUser(username, signal);
};

// const fetchDataWithFetch = async ({ queryKey, signal }) => {
//   const { username } = queryKey[0];
//   return await getUserWithFetch(username);
// };

const PrefetchedDataComponent = () => {
  const { data, isFetching } = useQuery({
    queryKey: userKeys.withUsername("userOne"),
    queryFn: fetchData,
    staleTime: Infinity,
  });

  return <div>{isFetching ? "Loading..." : data?.hello}</div>;
};

export const ExamplePrefetching = () => {
  const [renderComponent, setRenderComponent] = useState(false);
  const queryClient = useQueryClient();

  const prefetchData = async () => {
    await queryClient.prefetchQuery({
      queryKey: userKeys.withUsername("userOne"),
      queryFn: fetchData,
      staleTime: Infinity,
    });
    setRenderComponent(true);
  };

  return (
    <div>
      <button onClick={prefetchData}> Prefetch Data</button>
      {renderComponent ? <PrefetchedDataComponent /> : null}
    </div>
  );
};

export const QueryInvalidation = () => {
  const { data, isFetching } = useQuery({
    queryKey: userKeys.withUsername("userOne"),
    queryFn: fetchData,
  });
  const queryClient = useQueryClient();
  return (
    <div>
      <p>{isFetching ? "Loading..." : data?.hello}</p>
      <button onClick={() => queryClient.invalidateQueries(userKeys.api())}>
        Invalidate Query
      </button>
    </div>
  );
};

export const QueryCancelation = () => {
  const { data, isFetching } = useQuery({
    queryKey: userKeys.withUsername("userOne"),
    queryFn: fetchData,
  });
  const queryClient = useQueryClient();

  return (
    <div>
      <p>{isFetching ? "Loading..." : data?.hello}</p>
      <button onClick={() => queryClient.cancelQueries(userKeys.api())}>
        Cancel Query
      </button>
    </div>
  );
};

export default QueryCancelation;
