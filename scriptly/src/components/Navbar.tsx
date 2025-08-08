import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className=" flex bg-black text-white p-4 justify-between items-center">
      {/* Add your navigation items here
       Logo]
       I will divide the navigation items into sections
    2 section : left and right
    left section will contain the logo and the right section will contain the navigation items
    

 
*/}

      <section className=" cursor-default select-none section1 flex justify-center  w-[30%] ">
        <h1>Scriptly </h1>
      </section>
      <section className=" section2 relative w-[50%]">
        <ul className="flex w-full justify-end gap-3 mr-5">
          <li>
            <Button className=" text-white" variant={"link"}>
              Home
            </Button>
          </li>
          <li>
            <Button className=" text-white" variant={"link"}>
              About
            </Button>
          </li>
          <li>
            <Button className=" text-white" variant={"link"}>
              Contact
            </Button>
          </li>
        </ul>
      </section>
      <section className=" section3  flex justify-center w-[10%] gap-0.5 mr-5 ">
        <Button variant={"ghost"}>Login</Button>

        <Button variant={"ghost"}>Sign Up</Button>
      </section>
    </nav>
  );
};

export default Navbar;
