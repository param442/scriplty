import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex bg-black text-white p-4 justify-between items-center relative">
      <section className="flex justify-center items-center flex-1 min-w-0">
        <Link
          to="/"
          className="text-xl font-semibold hover:text-violet-300 transition-colors">
          Scriptly
        </Link>
      </section>

      <button
        className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle menu">
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <section className="hidden md:flex flex-1 justify-end items-center gap-3 mr-5">
        <Button asChild className="text-white" variant="link">
          <Link to="/">Home</Link>
        </Button>
        <Button className="text-white" variant="link">
          About
        </Button>
        <Button className="text-white" variant="link">
          Contact
        </Button>
      </section>

      <section className="hidden md:flex justify-center items-center gap-2">
        <Button asChild variant="ghost">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </section>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col gap-2 md:hidden z-50">
          <Button asChild className="text-white justify-start" variant="ghost">
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          </Button>
          <Button
            className="text-white justify-start"
            variant="ghost"
            onClick={() => setMobileOpen(false)}>
            About
          </Button>
          <Button
            className="text-white justify-start"
            variant="ghost"
            onClick={() => setMobileOpen(false)}>
            Contact
          </Button>
          <div className="h-px bg-white/10 my-2" />
          <Button asChild variant="ghost">
            <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/signup" onClick={() => setMobileOpen(false)}>
              Sign Up
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
