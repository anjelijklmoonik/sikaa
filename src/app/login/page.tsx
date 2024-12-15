import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const Login = () => {
  return (
    <main className="min-h-screen flex justify-center items-center bg-[#f5f5dc]">
      {/* Login Container */}
      <div className="bg-[#fcce7e] p-8 shadow-2xl w-[450px] h-auto">
        <div className="flex flex-row items-center justify-center mb-10">
          <img
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={150}
            className="mr-4"
          />
          <div className="font-bold font-serif">
            <h1 className="text-xl">SIKAA</h1>
            <h3 className="text-sm">KLABAT ADVENTIST ACADEMY</h3>
          </div>
        </div>

        {/* Username Input */}
        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                redirectTo: "/",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`/login?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <div className="mb-4 mx-2">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className="w-full p-1.5 justify-center text-sm text-black border border-black focus:outline-none focus:ring-2 focus:ring-[#f5f5dc]"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 mx-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-1.5 border text-sm text-black border-black focus:outline-none focus:ring-2 focus:ring-[#f5f5dc]"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-[#fcce7e] p-1.5 hover:bg-[#f5f5dc] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full h-auto bg-gray-300 p-4 text-center">
        <p className="text-xs">
          &copy; 2024 SMA-SMK ADVENT KLABAT MANADO. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Login;
