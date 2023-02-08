import axios from "axios";
import { gql, GraphQLClient } from "graphql-request";

export const axiosInstance = axios.create({
  baseURL: "https://danieljcafonso.builtwithdark.com",
});

export const getUser = async (username, signal) => {
  const { data } = await axiosInstance.get(`/react-query-api/${username}`, {
    signal,
  });
  return data;
};

export const getUserWithFetch = async (username, signal) => {
  const response = await fetch(`/react-query-api/${username}`, { signal });
  if (!response.ok) throw new Error("Something failed in your request");
  return response.json();
};

export const getPaginatedData = async (page) => {
  const { data } = await axiosInstance.get(
    `/react-query-paginated?page=${page}&results=10`
  );
  return data;
};

export const getInfiniteData = async ({ pageParam = 1 }) => {
  const { data } = await axiosInstance.get(
    `/react-query-infite?page=${pageParam}&results=10`
  );

  return data;
};

export const fetchAllData = async () => {
  const { data } = await axiosInstance.get(`/name-api`);
  return data;
};

export const createUser = async (user) => {
  return axiosInstance.post(`/name-api`, user);
};

export const createUserFetch = async (user) => {
  return fetch(`/name-api`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

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

const fetchGQL = async ({ signal }) => {
  const endpoint = "https://graphqlzero.almansi.me/api";
  const client = new GraphQLClient(endpoint);
  const {
    posts: { data },
  } = await client.request({ document: customQuery, signal });
  return data;
};
