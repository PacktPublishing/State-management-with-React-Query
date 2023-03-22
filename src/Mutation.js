import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchAllData = async () => {
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/name-api`
  );
  return data;
};

const createUser = async (user) => {
  return axios.post(`https://danieljcafonso.builtwithdark.com/name-api`, user);
};

const createUserFetch = async (user) => {
  return fetch(`https://danieljcafonso.builtwithdark.com/name-api`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const Mutation = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const { data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllData,
    retry: 0,
  });

  const mutation = useMutation({
    mutationFn: createUserFetch,
    retry: 3,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      }),
    onMutate: async (user) => {
      await queryClient.cancelQueries({
        queryKey: ["allUsers"],
      });

      const previousUsers = queryClient.getQueryData({
        queryKey: ["allUsers"],
      });

      queryClient.setQueryData(["allUsers"], (prevData) => [user, ...prevData]);

      return { previousUsers };
    },
    onError: (error, user, context) => {
      queryClient.setQueryData(["allUsers"], context.previousUsers);
    },
  });

  return (
    <div>
      {data?.map((user) => (
        <div key={user.userID}>
          Name: {user.name} Age: {user.age}
        </div>
      ))}
      <form>
        <input
          name="name"
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          name="number"
          type={"number"}
          onChange={(e) => setAge(Number(e.target.value))}
          value={age}
        />
        <button
          disabled={mutation.isPaused || mutation.isLoading}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate({ name, age });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export const SimpleMutation = () => {
  const [name, setName] = useState("");

  const { mutate, isPaused } = useMutation({
    mutationFn: createUser,
  });

  const submitForm = (e) => {
    e.preventDefault();
    mutate({ name, age: 0 });
  };

  return (
    <div>
      {isPaused && <p> Waiting for network to come back </p>}
      <form>
        <input
          name="name"
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button disabled={isPaused} onClick={submitForm}>
          Add
        </button>
      </form>
    </div>
  );
};

export const ConcurrentMutations = () => {
  const [name, setName] = useState("");

  const { mutateAsync: mutateAsyncOne } = useMutation({
    mutationFn: createUser,
  });
  const { mutateAsync: mutateAsyncTwo } = useMutation({
    mutationFn: createUser,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const mutationOne = mutateAsyncOne({ name, age: 99 });
    const mutationTwo = mutateAsyncTwo({ name, age: 99 });

    try {
      const data = await Promise.all([mutationOne, mutationTwo]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input
          name="name"
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={onSubmit}>Add</button>
      </form>
    </div>
  );
};
const showToast = (data) => console.log(data);
const goToRoute = (data) => console.log(data);

export const MutationWithSideEffects = () => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllData,
  });

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      const user = data.data;
      queryClient.setQueryData(["allUsers"], (prevData) => [user, ...prevData]);
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess: (data) => {
          const userId = data.data.userID;
          goToRoute(`/user/${userId}`);
        },
      }
    );
  };

  return (
    <div>
      <form>
        <input
          name="name"
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={submitForm}>Add</button>
      </form>
    </div>
  );
};

export default MutationWithSideEffects;
