import useMultipleQueries from "./hooks/useMultipleQueries";
import useMultipleQueriesV2 from "./hooks/useMultipleQueriesV2";

export const ExampleOne = () => {
  const { queryOneData, queryTwoData, queryThreeData } = useMultipleQueries();
  return (
    <div>
      <p>{queryOneData?.hello}</p>
      <p>{queryTwoData?.hello}</p>
      <p>{queryThreeData?.hello}</p>
    </div>
  );
};

export const ExampleTwo = () => {
  const { multipleQueries } = useMultipleQueriesV2();

  return (
    <div>
      {multipleQueries.map(({ data, isFetching }, index) => (
        <p key={index}>{isFetching ? "Fetching data..." : data.hello}</p>
      ))}
    </div>
  );
};

export default ExampleTwo;
