import Navbar from "./Navbar";
import { Button } from "./ui/button";
import CodePreview from "../assets/img/CodePreview.png";
const Homepage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col ">
      <Navbar />
      <div className="h-[60%]  flex ">
        <div className="left relative pt-5  h-full w-1/2">
          <h1 className=" relative top-[8%] left-[10%] w-[80%] text-7xl">
            Collaborative Code Editing, Simplified.
          </h1>
          <p className=" relative top-[12%] left-[10%]">
            Edit your code with your team in real-time
          </p>
          <Button
            variant={"default"}
            className=" text-2xl relative top-[15%] left-[10%]">
            {" "}
            Get Started
          </Button>
        </div>
        <div className="right h-full w-1/2">
          <img src={CodePreview} alt="CodePreview" />
        </div>
      </div>
      <div className="px-10 py-16 bg-gray-200  break-words">
        <h2 className="text-4xl font-bold text-center mb-10">Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded text-center">
            <h3 className="text-xl font-semibold mb-2">Real-time Editing</h3>
            <p>Work on code simultaneously with others.</p>
          </div>

          <div className="p-4 border rounded text-center">
            <h3 className="text-xl font-semibold mb-2">
              Multi-language Support
            </h3>
            <p>Use JavaScript, Python, C++, and more.</p>
          </div>

          <div className="p-4 border rounded text-center">
            <h3 className="text-xl font-semibold mb-2">Live Cursors</h3>
            <p>See who is editing in real time.</p>
          </div>

          <div className="p-4 border rounded text-center">
            <h3 className="text-xl font-semibold mb-2">No Setup Needed</h3>
            <p>Start coding without installing anything.</p>
          </div>
        </div>
      </div>
      <footer className=" bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2023 Scriptly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
