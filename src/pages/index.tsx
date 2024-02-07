// pages/signin.js
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider } from "firebase/auth";

import { useSignInWithProvider } from "../lib/hooks/useSignInWithProvider";
import { useSigninCheck } from "reactfire";
import { useSignInWithEmailAndPassword } from "@/lib/hooks/useSignInWithEmailAndPassword";

function SignInComponent() {
  const [signInWithProvider, signInWithProviderState] = useSignInWithProvider();
  const router = useRouter();
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "success" && signInCheckResult.signedIn === true) {
    router.push("/dashboard");
  }

  const AuthProviderButton = () => {
    return (
      <button
        className=" p-2 flex items-center justify-center space-x-2 bg-white text-black border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center gap-2"
        onClick={() => {
          signInWithProvider(new GoogleAuthProvider());
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_1163_66)">
            <path
              d="M15.4001 8.116C15.4001 7.48636 15.3478 7.02688 15.2346 6.5504H7.87695V9.39229H12.1957C12.1087 10.0985 11.6385 11.1621 10.5936 11.8768L10.579 11.972L12.9053 13.7331L13.0665 13.7488C14.5467 12.4129 15.4001 10.4474 15.4001 8.116Z"
              fill="#4285F4"
            />
            <path
              d="M7.87696 15.6037C9.9928 15.6037 11.7691 14.923 13.0665 13.7488L10.5936 11.8768C9.93187 12.3278 9.04371 12.6426 7.87696 12.6426C5.80464 12.6426 4.04578 11.3068 3.4188 9.4604L3.32689 9.46803L0.907916 11.2974L0.876282 11.3834C2.16495 13.8849 4.81197 15.6037 7.87696 15.6037Z"
              fill="#34A853"
            />
            <path
              d="M3.41874 9.4604C3.2533 8.98391 3.15756 8.47335 3.15756 7.94583C3.15756 7.41825 3.2533 6.90775 3.41003 6.43126L3.40565 6.32978L0.95636 4.47101L0.876224 4.50826C0.345103 5.54634 0.0403442 6.71206 0.0403442 7.94583C0.0403442 9.1796 0.345103 10.3453 0.876224 11.3833L3.41874 9.4604Z"
              fill="#FBBC05"
            />
            <path
              d="M7.87696 3.24898C9.34847 3.24898 10.3411 3.87011 10.9071 4.38918L13.1187 2.279C11.7604 1.04523 9.9928 0.287949 7.87696 0.287949C4.81197 0.287949 2.16495 2.0067 0.876282 4.50826L3.41009 6.43127C4.04578 4.58487 5.80464 3.24898 7.87696 3.24898Z"
              fill="#EB4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_1163_66">
              <rect
                width="15.3686"
                height="15.3686"
                fill="white"
                transform="translate(0.0396118 0.287949)"
              />
            </clipPath>
          </defs>
        </svg>
        Login with Google
      </button>
    );
  };

  const onSignIn = useCallback(() => {
    return router.push("/dashboard");
  }, [router]);

  useEffect(() => {
    if (signInWithProviderState.success) {
      onSignIn();
    }
  }, [signInWithProviderState.success, onSignIn]);

  const [signIn, state] = useSignInWithEmailAndPassword();
  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      onSignIn();
    }
  }, [onSignIn, state.success]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const email = data.get(`email`) as string;
      const password = data.get(`password`) as string;

      // sign user in
      return signIn(email, password);
    },
    [loading, signIn]
  );

  return (
    <section className=" text-black ">
      <div className="flex flex-col  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in
        </h1>
        <h2 className="py-2">Sign in your account</h2>

        <div className="w-full   xl:p-0 ">
          <AuthProviderButton />
          <div className="py-4 p-2 space-y-4 ">
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
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
                <div className="flex items-start">
                  {" "}
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>
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
