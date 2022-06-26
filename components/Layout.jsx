import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { appContext } from "../providers/AppProvider";
import { getSocket } from "../utils/socket";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  const router = useRouter();
  const [state, dispatch] = useContext(appContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "SET_STATE", payload: { token } });
      if (router.pathname == "/sayinweb/login") {
        router.push("/sayinweb");
      }
      const socket = getSocket();
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("subscribe", token);
        socket.on("token:refresh", (token) => {
          console.log(token);
          dispatch({ type: "SET_STATE", payload: { token } });
          localStorage.setItem("token", token);
        });
      });
    } else {
      router.push("/sayinweb/login");
    }
  }, []);

  return (
    <div className="flex">
      {/* <nav
    className="w-60 h-screen shadow-2xl text-white "
    style={{ backgroundColor: "#1A1C1E" }}
  >
    <ul style={{ fontSize: 14 }}>
      <li
        className="py-2 px-4 m-6 rounded-xl cursor-pointer"
        style={{ backgroundColor: "#313334" }}
      >
        Product
      </li>
    </ul>
  </nav> */}
      {state.loading ? (
        <div className="z-50 h-screen fixed top-0 left-0 w-screen flex justify-center items-center">
          <ReactLoading
            type="spinningBubbles"
            color="#0285FF"
            height={50}
            width={50}
          />
        </div>
      ) : (
        ""
      )}
      {router.pathname != "/sayinweb/login" ? <SideBar /> : ""}
      <div className="flex-grow overflow-auto h-screen">{children}</div>
    </div>
  );
}
