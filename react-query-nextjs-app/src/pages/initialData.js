import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`
  );
  return data;
};

export async function getServerSideProps() {
  const user = await fetchData({ queryKey: [{ username: "danieljcafonso" }] });
  return { props: { user } };
}

export default function InitialData(props) {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "danieljcafonso" }],
    queryFn: fetchData,
    initialData: props.user,
  });

  return <div>This page is server side rendered {data.hello}</div>;
}
