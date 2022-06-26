import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { appContext } from "../../../providers/AppProvider";
import { http } from "../../../utils/http";

export default function Login() {
  const router = useRouter();
  const [state, dispatch] = useContext(appContext);
  const [userid, setUserid] = useState("admin@gmail.com");
  const [password, setPassword] = useState("User@123");

  const handleLogin = async () => {
    if (!userid) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter Email or Phone!",
      });
    }
    if (!password) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter password!",
      });
    }
    dispatch({ type: "SET_STATE", payload: { loading: true } });
    const [err, response] = await http.post("/sayin/auth/login", {
      userid,
      password,
    });
    dispatch({ type: "SET_STATE", payload: { loading: false } });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          (err.response.data && err.response.data.message) ||
          err.message ||
          "Something went wrong!",
      });
    }
    localStorage.setItem("token", response.data.data.token);
    dispatch({
      type: "SET_STATE",
      payload: { token: response.data.data.token },
    });
    router.push("/sayinweb");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="bg-white shadow-lg px-12 py-14 rounded-3xl"
        style={{ maxWidth: 400 }}
      >
        <h1 className="font-bold mb-5 text-center" style={{ fontSize: 24 }}>
          Login
        </h1>
        <p className="text-center px-10 mb-10" style={{ fontSize: 15 }}>
          Hey, Enter your details to get sign in to your account
        </p>
        <div className="mb-5">
          <TextInput
            py="3"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            placeholder="Enter Email / Phone No"
          />
        </div>
        <div>
          <TextInput
            py="3"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passcode"
          />
        </div>
        <p className="text-sm my-10">Having trouble in sign in?</p>
        <Button onClick={handleLogin} block>
          Sign In
        </Button>
        {/* <p className="text-sm text-center">Or Sign in with</p>
        <div className="flex">
          <div></div>
          <div></div>
        </div> */}
      </div>
    </div>
  );
}
