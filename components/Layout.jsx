import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { appContext } from "../providers/AppProvider";
import { http } from "../utils/http";
import { getSocket } from "../utils/socket";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  const router = useRouter();
  const [state, dispatch] = useContext(appContext);

  const fetchModulePermissions = async () => {
    const modulepermissions = localStorage.getItem("modulepermissions");
    if (modulepermissions) {
      dispatch({
        type: "SET_STATE",
        payload: { modulepermissions: JSON.parse(modulepermissions) },
      });
    }
    dispatch({
      type: "SET_STATE",
      payload: { loading: true },
    });
    const [err, response] = await http.get("/sayin/auth/module-permissions");
    dispatch({
      type: "SET_STATE",
      payload: { loading: false },
    });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          (err.response.data && err.response.data.message) ||
          err.message ||
          "Something went wrong!",
      });
    }

    const moduleheaders = {};
    const sortItems = {};
    for (const mp of response.data.data) {
      moduleheaders[mp.module.name] = mp.tableheaders;
      sortItems[mp.module.name] = mp.tableheaders.map((header) => ({
        ...header,
        order: header.key == "createdAt" ? "desc" : "asc",
        checked: header.key == "createdAt" ? true : false,
      }));
    }
    dispatch({
      type: "SET_STATE",
      payload: {
        modulepermissions: response.data.data,
        moduleheaders,
        sortItems,
      },
    });
    localStorage.setItem(
      "modulepermissions",
      JSON.stringify(response.data.data)
    );
  };

  useEffect(() => {
    if (state.token) {
      fetchModulePermissions();
    }
  }, [state.token]);

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
