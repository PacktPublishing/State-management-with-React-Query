import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-infinite?page=${pageParam}&results=10`
  );

  return data;
};

const InfiniteScroll = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["api"],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.info?.nextPage;
    },
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
