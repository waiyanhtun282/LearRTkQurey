import { PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/api/authApi";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Register = () => {

  // const [name, setName] = useState("Raymond");
  // const [email, setEmail] = useState("raymond2035@gmail.com");
  // const [password, setPassword] = useState("200300500");
  // const [password_confirmation, setPassword_confirmation] =
  //   useState("200300500");



  const [register,{isLoading,isFetching}] = useRegisterMutation();
  const nav =useNavigate();
  
    const form = useForm({
      initialValues: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },

      validate: {
        name: (value) =>
          value.length < 2 ? "Name must have at least 2 letters" : null,
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        password: (value) =>
          value.length < 8 ? "Your password have at least 8 " : null,
        password_confirmation: (value, values) =>
          value !== values.password ? "Passwords did not match" : null,
      },
    });

   

  // const registerHandler = async(e) => {
  //   e.preventDefault();
  //   // console.log({name,password,email,password_confirmation})
  
  //   const user ={ name, email, password, password_confirmation };
  //   const {data} = await register(user );
  //   // console.log(data);
  //   if(data?.success){
  //     nav('/login')
  //   }
  // };



  return (
    <div className=" h-screen  flex justify-center items-center">
      <form
        onSubmit={form.onSubmit(async(values) => {
          try {
            const {data} =await register(values);
            if(data?.success)  nav("/login");
          } catch (error) {
            console.log(error)
          }
        })}
        action=""
        className=" w-96 bg-gray-200 p-5  rounded-lg shadow-lg flex flex-col gap-5"
      >
        <h1 className=" font-medium text-[24px] text-[#e85daa]">Register</h1>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter your name...."
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your email...."
        />
        <PasswordInput
          {...form.getInputProps("password")}
          placeholder="Enter your password..."
        />
        <PasswordInput
          {...form.getInputProps("password_confirmation")}
          placeholder="Enter your password-Confirm..."
        />
        <div className=" flex items-center gap-10">
          <p className="">ALready have an account?</p>
          <Link to={"/login"}>
            <p className=" font-medium text-violet-600 text-[22px] cursor-pointer">
              Login
            </p>
          </Link>
        </div>

        <button disabled={isFetching && true} className=" bg-violet-600 text-white py-2 rounded-lg cursor-pointer">
          {isLoading ?(<Loader className=" mx-auto block" color="red" size="sm" />):"Sing Up" }

        </button>
      </form>
    </div>
  );
};

export default Register;
