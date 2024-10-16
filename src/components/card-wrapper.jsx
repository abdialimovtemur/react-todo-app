import React, { useContext } from "react";
import { TodoProviderWrapper } from "../providers/todo-provider/todo-provider";
import { DELETE_USER } from "../providers/todo-provider/todo-types";

export const CardWrapper = ({ handleEdit }) => {
  const { data, dispatch } = useContext(TodoProviderWrapper);

  const deleteItem = (id) => {
    dispatch({ type: DELETE_USER, id });
  };

  return (
    <div>
      {data?.users?.map((user) => (
        <div key={user.id}>
          <h1>
            {user.user_name} {user.last_name}
          </h1>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => deleteItem(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
