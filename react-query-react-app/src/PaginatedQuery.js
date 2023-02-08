import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPaginatedData } from "./api/userAPI";
import { userKeys } from "./utils/queryKeyFactories";

const fetchData = async ({ queryKey }) => {
  const { page } = queryKey[0];
  return await getPaginatedData(page)
};

export const PaginatedQuery = () => {
  const [page, setPage] = useState(0);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: userKeys.paginated,
      queryFn: fetchData,
      keepPreviousData: true,
    });

  if (isLoading) {
    return <h2>Loading initial data...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data.results.map((user) => (
          <div key={user.email}>
            {user.name.first}
            {user.name.last}
          </div>
        ))}
      </div>
      <div>
      <button
        onClick={() => setPage((oldValue) => oldValue === 0 ? 0 : oldValue - 1)}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        disabled={isPreviousData}
        onClick={() => {
          if (!isPreviousData) setPage((old) => old + 1);
        }}
      >
        Next Page
      </button>
      </div>
      {isFetching ? <span> Loading...</span> : null}
    </>
  );
};

export default PaginatedQuery;
