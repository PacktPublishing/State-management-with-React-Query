import axios from "axios";
import { useQuery, useQueries } from "@tanstack/react-query";

const fetchData = async ({ queryKey }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api/${username}`
  );
  return data;
};

const ExampleOne = () => {
  const { data: queryOneData  } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
  });
  const { data: queryTwoData } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userTwo" }],
    queryFn: fetchData,
  });
  const { data: queryThreeData } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userThree" }],
    queryFn: fetchData,
  });

  return (
    <div>
      <p>{queryOneData?.hello}</p>
      <p>{queryTwoData?.hello}</p>
      <p>{queryThreeData?.hello}</p>
    </div>
  );
};

const usernameList = ["userOne", "userTwo", "userThree"];

const ExampleTwo = () => {
  const multipleQueries = useQueries({
    queries: usernameList.map((username) => {
      return {
        queryKey: [{ queryIdentifier: "api", username }],
        queryFn: fetchData,
      };
    }),
  });

  return (
    <div>
      {multipleQueries.map(({ data, isFetching }) => (
        <p>{isFetching ? "Fetching data..." : data.hello}</p>
      ))}
    </div>
  );
};

export default ExampleTwo;
