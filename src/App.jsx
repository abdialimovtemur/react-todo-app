import { useForm } from "react-hook-form";
import { CardWrapper } from "./components/card-wrapper";
import { TodoProviderWrapper } from "./providers/todo-provider/todo-provider";
import React, { useState } from "react";
import { ADD_USER, EDIT_USER } from "./providers/todo-provider/todo-types";
import { nanoid } from "nanoid";

function App() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { dispatch, data } = React.useContext(TodoProviderWrapper);
  const [editId, setEditId] = useState(null);

  const submit = (formData) => {
    if (editId) {
      // Update existing user
      dispatch({
        type: EDIT_USER,
        value: { ...formData, id: editId },
      });
      setEditId(null);
    } else {
      // Add new user
      dispatch({
        type: ADD_USER,
        value: { ...formData, id: nanoid() },
      });
    }
    reset();
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setValue("user_name", user.user_name);
    setValue("last_name", user.last_name);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("user_name")} type="text" placeholder="First Name" />
        <br />
        <input {...register("last_name")} type="text" placeholder="Last Name" />
        <br />
        <button type="submit">{editId ? "Edit User" : "Add User"}</button>
      </form>
      <CardWrapper handleEdit={handleEdit} />
    </>
  );
}

export default App;
