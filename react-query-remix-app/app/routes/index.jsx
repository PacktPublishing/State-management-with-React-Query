import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { json } from "@remix-run/node";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`
  );
  return data;
};

export async function loader() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [{ queryIdentifier: "api", username: "danieljcafonso" }],
    fetchData
  );
  return json({ dehydratedState: dehydrate(queryClient) });
}

export default function Index() {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "danieljcafonso" }],
    queryFn: fetchData,
  });

  return <div>This page is server side rendered {data.hello}</div>;
}
