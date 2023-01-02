import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { gql, GraphQLClient } from "graphql-request";

const customQuery = gql`
  query {
    posts {
      data {
        id
        title
      }
    }
  }
`;
const fetchGQL = async ({signal}) => {
  const endpoint = "https://graphqlzero.almansi.me/api";
  const client = new GraphQLClient(endpoint)  
  const {
    posts: { data },
  } = await client.request({document: customQuery, signal});
  return data;
};

const fetchData = async ({ queryKey, signal }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`,
    { signal }
  );
  return data;
};

const fetchDataWithFetch = async ({ queryKey, signal }) => {
  const { username } = queryKey[0];
  const response = await fetch(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`,
    { signal }
  );
  if (!response.ok) throw new Error("Something failed in your request");
  return response.json();
};

const PrefetchedDataComponent = () => {
  const { data, isFetched } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
    staleTime: 60000,
  });

  console.log(data, isFetched);
  return <div>{data?.hello}</div>;
};

const ExamplePrefetching = () => {
  const [renderComponent, setRenderComponent] = useState(false);
  const queryClient = useQueryClient();

  const prefetchData = async () => {
    await queryClient.prefetchQuery({
      queryKey: [{ queryIdentifier: "api", username: "userOne" }],
      queryFn: fetchData,
      staleTime: 60000,
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

const QueryInvalidation = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
  });
  const queryClient = useQueryClient();

  return (
    <div>
      <p>{data?.hello}</p>
      <button
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: [{ queryIdentifier: "api" }],
          })
        }
      >
        Invalidate Query
      </button>
    </div>
  );
};

const QueryCancelation = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
  });
  const queryClient = useQueryClient();

  return (
    <div>
      <p>{data?.hello}</p>
      <button
        onClick={() =>
          queryClient.cancelQueries({
            queryKey: [{ queryIdentifier: "api" }],
          })
        }
      >
        Cancel Query
      </button>
    </div>
  );
};

export default QueryCancelation;
