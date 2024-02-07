import GuardedPage from "@/components/GuardedPage";
import Head from "next/head";
import { useUser } from "reactfire";
import { Navbar } from "../components/navbar/Navbar";
import Header from "@/components/header/Header";
import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// import { Header } from "../components/header/Header";

const Dashboard = () => {
  const { status, data: user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [data, setData] = useState<SetStateAction<any[]>>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const files = event.target.files;
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (loading) {
      return;
    }
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setLoading(true);
      await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setData(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Error",
            description: "An error occurred while uploading the file.",
            variant: "destructive",
            duration: 2000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Head>
      <GuardedPage whenSignedOut="/">
        <div className="flex max-h-screen overflow-hidden  ">
          <Navbar></Navbar>
          <main className="shrink-0 grow max-h-screen overflow-scroll">
            <Header></Header>
            <div className="w-full  px-8 pt-9 bg-gray-50 flex justify-center mt-32   ">
              <div className="">
                {" "}
                <div className="flex  border border-gray-200 p-4 h-fit rounded-md">
                  <div className="flex p-28 flex-col gap-6 justify-center content-center ">
                    {" "}
                    <div className="svg flex w-full justify-center content-center ">
                      <svg
                        width="30"
                        height="28"
                        viewBox="0 0 30 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_22_2725)">
                          <path
                            d="M18.7801 13.2998L6.95557 11.1998V26.7167C6.95557 27.4253 7.52638 27.9998 8.23053 27.9998H28.6341C29.3382 27.9998 29.9091 27.4253 29.9091 26.7167V20.9998L18.7801 13.2998Z"
                            fill="#185C37"
                          />
                          <path
                            d="M18.7802 0H8.23059C7.52644 0 6.95563 0.57446 6.95563 1.2831V7L18.7802 14L25.0402 16.1L29.9091 14V7L18.7802 0Z"
                            fill="#21A366"
                          />
                          <path
                            d="M6.95563 7H18.7802V14H6.95563V7Z"
                            fill="#107C41"
                          />
                          <path
                            opacity="0.1"
                            d="M15.4185 5.60049H6.95557V23.1005H15.4185C16.1216 23.0982 16.6911 22.5251 16.6934 21.8174V6.88359C16.6911 6.17591 16.1216 5.60279 15.4185 5.60049Z"
                            fill="black"
                          />
                          <path
                            opacity="0.2"
                            d="M14.7229 6.30025H6.95557V23.8002H14.7229C15.4261 23.7979 15.9956 23.2248 15.9978 22.5171V7.58334C15.9956 6.87567 15.4261 6.30255 14.7229 6.30025Z"
                            fill="black"
                          />
                          <path
                            opacity="0.2"
                            d="M14.7229 6.30025H6.95557V22.4002H14.7229C15.4261 22.3979 15.9956 21.8248 15.9978 21.1172V7.58334C15.9956 6.87567 15.4261 6.30255 14.7229 6.30025Z"
                            fill="black"
                          />
                          <path
                            opacity="0.2"
                            d="M14.0273 6.30025H6.95557V22.4002H14.0273C14.7305 22.3979 15.3 21.8248 15.3023 21.1172V7.58334C15.3 6.87567 14.7305 6.30255 14.0273 6.30025Z"
                            fill="black"
                          />
                          <path
                            d="M1.27496 6.30025H14.0274C14.7315 6.30025 15.3023 6.87471 15.3023 7.58334V20.4171C15.3023 21.1258 14.7315 21.7002 14.0274 21.7002H1.27496C0.570817 21.7002 0 21.1258 0 20.4171V7.58334C0 6.87471 0.570817 6.30025 1.27496 6.30025Z"
                            fill="url(#paint0_linear_22_2725)"
                          />
                          <path
                            d="M3.94867 18.1706L6.63075 13.9881L4.17334 9.82869H6.15011L7.49115 12.4887C7.61497 12.7414 7.69982 12.929 7.74574 13.0529H7.76312C7.85123 12.8513 7.94397 12.6555 8.04135 12.4656L9.47489 9.8301H11.2896L8.76959 13.965L11.3536 18.1706H9.42274L7.87372 15.2509C7.80075 15.1267 7.73884 14.9962 7.68871 14.861H7.66576C7.62038 14.9934 7.56018 15.1203 7.4863 15.239L5.89138 18.1706H3.94867Z"
                            fill="white"
                          />
                          <path
                            d="M28.6342 0H18.7802V7H29.9091V1.2831C29.9091 0.57446 29.3383 0 28.6342 0Z"
                            fill="#33C481"
                          />
                          <path
                            d="M18.7802 14H29.9091V21H18.7802V14Z"
                            fill="#107C41"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_22_2725"
                            x1="2.65832"
                            y1="5.29766"
                            x2="12.7396"
                            y2="22.6473"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#18884F" />
                            <stop offset="0.5" stop-color="#117E43" />
                            <stop offset="1" stop-color="#0B6631" />
                          </linearGradient>
                          <clipPath id="clip0_22_2725">
                            <rect width="29.9091" height="28" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Input
                        onChange={handleFileChange}
                        className=""
                        type="file"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleUpload}
                  className={cn(
                    "bg-violet-600 text-white p-2 rounded-sm w-full mt-6 flex justify-center gap-2 items-center",
                    data.length > 1 ? "cursor-not-allowed bg-violet-200" : ""
                  )}
                >
                  {loading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>
        </div>
      </GuardedPage>
    </>
  );
};

export default Dashboard;
