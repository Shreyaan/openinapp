import GuardedPage from "@/components/GuardedPage";
import Head from "next/head";
import { useUser } from "reactfire";
import { Navbar } from "../components/navbar/Navbar";
import  Header from "@/components/header/Header";
// import { Header } from "../components/header/Header";

const Dashboard = () => {
  const { status, data: user } = useUser();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Head>
      <GuardedPage whenSignedOut="/">
      <div className="flex max-h-screen overflow-hidden ">
      <Navbar></Navbar>
        <main className="shrink-0 grow max-h-screen overflow-scroll">
          <Header></Header>
          <div className="w-full px-8 pt-9 ">

          </div>
          </main>
      </div>
      </GuardedPage>
    </>
  );
};

export default Dashboard;
