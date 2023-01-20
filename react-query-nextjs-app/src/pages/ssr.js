import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`
  );
  return data;
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [{ queryIdentifier: "api", username: "danieljcafonso" }],
    fetchData
  );
  
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default function SSR() {
  const { data  } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "danieljcafonso" }],
    queryFn: fetchData,
    staleTime: 60000
  });

  return <div>This page is server side rendered {data.hello}</div>;
}
