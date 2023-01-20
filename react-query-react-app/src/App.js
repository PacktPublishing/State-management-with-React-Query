import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = async ({ queryKey }) => {
  const { apiName } = queryKey[0];
  const response = await fetch(
    `https://danieljcafonso.builtwithdark.com/${apiName}`
  );
  if (!response.ok) throw new Error("Something failed in your request");
  return response.json();
};

const apiA = "react-query-api";
const apiB = "react-query-api-two";

const ComponentA = () => {
  const { data, error, isLoading, isError, isFetching } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    queryFn: fetchData,
    retry: 1,
  });

  if (isLoading) return <div> Loading data... </div>;

  if (isError)
    return (
      <div> Something went wrong... Here is the error: {error.message}</div>
    );

  return (
    <div>
      <p>{isFetching ? "Fetching Component A..." : data.hello} </p>
      <ComponentB/>
    </div>
  );
};

const ComponentB = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiB }],
    queryFn: fetchData,
    onSuccess: (data) => console.log("Component B fetched data", data),
  });
  return (
    <div>
      <span>{data?.hello}</span>
      <ComponentC parentData={data} />
    </div>
  );
};

const ComponentC = ({ parentData }) => {
  const { data, isFetching } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    queryFn: fetchData,
    enabled: parentData !== undefined,
  });
  const queryClient = useQueryClient();

  return (
    <div>
      <p>{isFetching ? "Fetching Component C..." : data.hello} </p>
      <button
        onClick={() =>
          queryClient.refetchQueries({
            queryKey: [{ queryIdentifier: "api", apiName: apiA }],
          })
        }
      >
        Refetch Parent Data
      </button>
    </div>
  );
};

export default ComponentA;
