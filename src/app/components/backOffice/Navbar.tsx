import { AlignJustify, Bell, Sun, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-slate-800  text-slate-50  h-16  px-8 py-4 fixed top-0 w-full z-10 left-60 right-0">
      {/* Icon  */}

      <button>
        <AlignJustify size={24} />
      </button>
      {/* 3 Icons  */}

      <div className="flex space-x-3">
        <button>
          <Sun size={24} />
        </button>

        <button>
          <Bell size={24} />
        </button>

        <button>
          <User size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
