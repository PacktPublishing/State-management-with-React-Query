import {
  useQuery,
  useMutation,
  useQueryClient,
  useMutationState,
} from "@tanstack/react-query";
import { useState } from "react";
import { createUser, fetchAllData } from "./api/userAPI";
import useOptimisticUpdateUserCreation from "./hooks/user/useOptimisticUpdateUserCreation";
import { userKeys } from "./utils/queryKeyFactories";

export const OptimisticMutation = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const { data } = useQuery({
    queryKey: userKeys.all(),
    queryFn: fetchAllData,
    retry: 0,
  });

  const mutation = useOptimisticUpdateUserCreation();

  return (
    <div>
      {data?.map((user, index) => (
        <div key={user.userID + index}>
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
          disabled={mutation.isPaused || mutation.isPending}
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
export const showToast = (data) => console.log(data);
export const goToRoute = (data) => console.log(data);

export const MutationWithSideEffects = () => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: userKeys.all(),
    queryFn: fetchAllData,
  });

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      const user = data.data;
      queryClient.setQueryData(userKeys.all(), (prevData) => [
        user,
        ...prevData,
      ]);
      showToast("toast");
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    mutate(
      { name, age: 99 },
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

export const NewOptimisticMutation = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: userKeys.all(),
    queryFn: fetchAllData,
    retry: 0,
  });

  const mutation = useMutation({
    mutationFn: createUser,
    retry: 0,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.all() }),
  });

  return (
    <div>
      {data?.map((user, index) => (
        <div key={user.userID + index}>
          Name: {user.name} Age: {user.age}
        </div>
      ))}
      {mutation.isPending && (
        <div key={String(mutation.submittedAt)}>
          Name: {mutation.variables.name} Age: {mutation.variables.age}
        </div>
      )}
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
          disabled={mutation.isPaused || mutation.isPending}
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

export const MutationForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    mutationKey: userKeys.userMutation(),
    retry: 0,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.all() }),
  });

  return (
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
        disabled={mutation.isPaused || mutation.isPending}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate({ name, age });
        }}
      >
        Add
      </button>
    </form>
  );
};

export const NewOptimisticMutationV2 = () => {
  const { data } = useQuery({
    queryKey: userKeys.all(),
    queryFn: fetchAllData,
    retry: 0,
  });

  const [mutation] = useMutationState({
    filters: { mutationKey: userKeys.userMutation(), status: "pending" },
    select: (mutation) => ({
      ...mutation.state.variables,
      submittedAt: mutation.state.submittedAt,
    }),
  });

  return (
    <div>
      {data?.map((user, index) => (
        <div key={user.userID + index}>
          Name: {user.name} Age: {user.age}
        </div>
      ))}
      {mutation && (
        <div key={String(mutation.submittedAt)}>
          Name: {mutation.name} Age: {mutation.age}
        </div>
      )}
      <MutationForm />
    </div>
  );
};

export default MutationWithSideEffects;
