import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { useRouter } from "next/router";

const AdminIndex = () => {
  const router = useRouter();

  async function handleClick(e) {
    e.preventDefault();
    window.location.replace("/admin/xsnapsteruser");
  }

  return (
    <div className="pt-[95px]">
      <div>
        <div className="m-5">
          <h1 className="text-[25px] font-semibold">
            Admin Panel of <bold className="text-red-500">X</bold>SNAPSTER
          </h1>
        </div>

        <div className="m-5">
          <form className="form">
            <p className="heading">
              <bold className="text-red-500">X</bold>SNAPSTER LOGIN
            </p>
            <input className="input" placeholder="Username" type="text" />
            <input className="input" placeholder="Password" type="text" />
            <button type="submit" onClick={handleClick} className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
