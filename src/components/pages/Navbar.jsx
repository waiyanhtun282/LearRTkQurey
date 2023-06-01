import React from 'react'
import {AiFillReconciliation} from 'react-icons/ai';
// import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../features/api/authApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { removeUser } from '../features/services/slice';
const Navbar = () => {

  // const user =useSelector((state) => state.auth.user);
  // const {token} = useSelector((state) => state.auth);

  const user =JSON.parse(Cookies.get("user"));
  const token =Cookies.get("token");
  const dispatch =useDispatch();
  // console.log(token);
  const nav =useNavigate();
  const [logout] =useLogoutMutation();

  const logoutHandler =async () =>{
    const {data} =await logout(token);
    // console.log(data);
    dispatch(removeUser());
    if(data?.success) nav('/login');

  }
  return (
    <div className=" container px-8 shadow-lg ">
      <div className=" p-2 flex justify-between">
        <p className=" flex gap-5">
          <AiFillReconciliation className=" text-2xl text-rose-500" />
          <span>Dashboard</span>
        </p>
        <div className=" flex  gap-5 ">
          <div className=" text-center">
            <p className="">{user?.name}</p>
            <p className="">{user?.email}</p>
          </div>
          <div className="">
            <button
              onClick={logoutHandler}
              className="outline-none px-2 py-1 text-white bg-violet-500  rounded-xl cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar

