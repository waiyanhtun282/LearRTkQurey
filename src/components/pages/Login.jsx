import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../features/services/slice";
import { useForm } from "@mantine/form";

const Login = () => {

  // const [email, setEmail] = useState("raymond2035@gmail.com");
  // const [password, setPassword] = useState("200300500");

  const [login,{isLoading,isFetching}] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

   const form = useForm({
     initialValues: {
       email: "",
       password: "",
     },

     validate: {
       
       email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
       password: (value) =>
         value.length < 8 ? "Your password have at least 8 " : null,
     
     },
   });

  // const loginHandler = async (e) => {
  //   e.preventDefault();
  //   const user = { email, password };
  //   const { data } = await login(user);
  //   // console.log(data);
  //   dispatch(addUser({ user: data?.user, token: data?.token }));
  //   if (data?.success) nav("/");
  // };

  return (
    <div className=" h-screen  flex justify-center items-center">
      <form
        action=""
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);

            dispatch(addUser({ user: data?.user, token: data?.token }));
            if (data?.success) nav("/");
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 bg-gray-200 p-5  rounded-lg shadow-lg flex flex-col gap-5"
      >
        <h1 className=" font-medium text-[24px] text-[#e85daa]">Login</h1>

        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your email...."
        />
        <PasswordInput
          {...form.getInputProps("password")}
          placeholder="Enter your password..."
        />

        <div className=" flex items-center gap-10">
          <p className="">You have no account?</p>
          <Link to={"/register"}>
            <p className=" font-medium text-violet-600 text-[19px] cursor-pointer">
              Register
            </p>
          </Link>
        </div>

        <button
          disabled={isFetching && true}
          className=" bg-violet-600 text-white py-2 rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" color="red" size="sm" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
