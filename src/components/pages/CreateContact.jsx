import { TextInput } from "@mantine/core";
import React from "react";
import { useGetCreateContactMutation } from "../features/api/contactApi";
import { hasLength, useForm } from "@mantine/form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {


  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Name is Required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // phone: hasLength({ min: 9, max: 11 }),
      // address: (value) =>
      //   value.length < 5 ? "Address must be at least 5 letters" : null,
    },
  });

  const [getCreateContact] = useGetCreateContactMutation();
  const token = Cookies.get("token");
  const nav =useNavigate();
  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        action=""
        onSubmit={form.onSubmit(async(values) => {
          const data = await getCreateContact({ token, data: values });
           console.log(data);
          if(data?.success) nav('/')
          // console.log(values);
        })}
        className=" w-96 bg-gray-200 p-5  rounded-lg shadow-lg flex flex-col gap-5"
      >
        <h1 className=" font-medium text-[24px] text-[#e85daa]">
          Create Contact
        </h1>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter your name...."
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your email...."
        />
        <TextInput
          {...form.getInputProps("phone")}
          placeholder="Enter your phone...."
        />
        <TextInput
          {...form.getInputProps("address")}
          placeholder="Enter your address...."
        />

        <button
          type="submit"
          className=" px-3 py-2 bg-pink-500 text-white flex ms-auto rounded-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
