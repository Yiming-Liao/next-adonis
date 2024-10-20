import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-36 bg-slate-100 p-6  flex flex-col justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <Link
          href={"/"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          Home
        </Link>
        <Link
          href={"/register"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          register
        </Link>
        <Link
          href={"/login"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          login
        </Link>
        <Link
          href={"/dashboard"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          dashboard
        </Link>
        <Link
          href={"/password-change"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          password-change
        </Link>
        <Link
          href={"/password-forgot"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          password-forgot
        </Link>
        <Link
          href={"/logout"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          logout
        </Link>
      </div>

      <div className="w-full flex justify-between items-center border-2 opacity-50">
        <Link
          href={"/email-not-verified"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          email-not-verified
        </Link>
        <Link
          href={"/email-verify"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          email-verify
        </Link>
        <Link
          href={"/password-reset"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          password-reset
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
