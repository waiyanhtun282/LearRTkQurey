import React from 'react'
import { Table, Loader } from "@mantine/core";
import { useGetContactQuery } from '../features/api/contactApi';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  // console.log(data?.contacts);

  if(isLoading){
    return (
      <div className=" h-screen flex justify-center items-center">
        <div>
          <Loader color="pink" variant="bars" />;
        </div>
      </div>
    );
  }
  return (
    <>
    <Link to={'/create'}>
      <button className="px-2 py-2 my-5 bg-rose-500 text-white rounded-xl">Create Contact</button>
    
    </Link>
      <div className=" my-8 ">
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Address</td>
            </tr>
          </thead>
          <tbody>
            {data?.contacts?.data?.map((item) => {
              return (
                <tr key={item?.id}>
                  <td>{item?.name === null ? "example" : item?.name}</td>
                  <td>
                    {item?.email === null ? "example@gmail.com" : item?.email}
                  </td>
                  <td>{item?.phone === null ? "095146124" : item?.phone}</td>
                  <td>{item?.address === null ? "NewYork" : item?.address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ContactTable
