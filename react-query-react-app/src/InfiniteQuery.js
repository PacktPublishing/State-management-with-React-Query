import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteData } from "./api/userAPI";
import { userKeys } from "./utils/queryKeyFactories";

const InfiniteScroll = () => {
  const {
    isPending,
    isError,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: userKeys.api(),
    queryFn: getInfiniteData,
    defaultPageParam: 0,
    maxPages: 5,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.info?.nextPage;
    },
    getPreviousPageParam: (firstPage, pages) => {
      return firstPage?.info?.prevPage
    }
  });

  if (isPending) {
    return <h2>Loading initial data...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data.pages.map((page) =>
          page.results.map((user) => (
            <div key={user.email}>
              {user.name.first}
              {user.name.last}
            </div>
          ))
        )}
      </div>
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={fetchNextPage}
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load More"
          : "You have no more data"}
      </button>
    </>
  );
};

export default InfiniteScroll;
