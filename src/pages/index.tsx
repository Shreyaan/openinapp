// pages/signin.js
import Head from "next/head";
import Image from "next/image";

function SignInComponent() {
  return (
    <section className="bg-gray-50 text-black ">
      <div className="flex flex-col  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in
        </h1>
        <h2 className="py-2">Sign in your account</h2>

        <div className="w-full   xl:p-0 ">
          <div className="py-4 p-2 space-y-4 ">
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">  <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline "
                >
                  Forgot password?
                </a></div>
              
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline "
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Login() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="w-1/2 text-white hidden flex-col justify-between p-12 lg:flex relative">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "#605BFF",
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
          }}
        ></div>
        <div className="relative flex flex-col justify-between h-full">
          {" "}
          <div className="flex  ">
            <div className="rounded-full  w-16 h-16  flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="87"
                height="81"
                viewBox="0 0 87 81"
                fill="none"
              >
                <circle cx="44.1102" cy="40.3929" r="40.0765" fill="#FCFCFF" />
                <path
                  d="M2.02979 37.0531L32.0871 51.7478L58.8048 29.7058L84.8545 43.0646"
                  stroke="#605BFF"
                  stroke-width="6"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-center">
            <h1 className="text-7xl font-bold">BASE</h1>
          </div>
          <div className="flex justify-center items-center content-center space-x-4 ">
            {/* Icons here */}
            <a href="#" className="shrink-0">
              <Image
                src="/icons/github.png"
                width={39}
                height={39}
                alt="github"
              />
            </a>
            <a href="#" className="shrink-0">
              {" "}
              <Image src="/icons/x.png" width={40} height={40} alt="Twitter" />
            </a>
            <a href="#" className="shrink-0">
              <Image
                src="/icons/discord.png"
                width={45}
                height={45}
                alt="discord"
              />
            </a>
            <a href="#" className="shrink-0">
              <Image
                src="/icons/linkedin.png"
                width={44}
                height={44}
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <SignInComponent></SignInComponent>
      </div>
    </div>
  );
}
