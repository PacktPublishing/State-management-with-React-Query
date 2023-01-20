import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`
  );
  return data;
};

export async function loader() {
  const user = await fetchData({ queryKey: [{ username: "danieljcafonso" }] });
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData();

  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "danieljcafonso" }],
    queryFn: fetchData,
    initialData: user,
  });

  return <div>This page is server side rendered {data.hello}</div>;
}
