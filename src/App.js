import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAPI = async () => {
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/react-query-api`
  );
  return data;
};

const App = () => {
  const { data } = useQuery({
    queryKey: ["api"],
    queryFn: fetchAPI,
  });

  return (
    <div className="App">
       {data ? data.hello : "Loading..."}
    </div>
  );
};

export default App;
