import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="bg-white shadow-lg p-10 rounded-3xl"
        style={{ maxWidth: 400 }}
      >
        <h1 className="font-bold mb-5 text-center" style={{ fontSize: 24 }}>
          Login
        </h1>
        <p className="text-center px-10" style={{ fontSize: 15 }}>
          Hey, Enter your details to get sign in to your account
        </p>
        <div className="mb-3">
          <TextInput placeholder="Enter Email / Phone No" />
        </div>
        <div className="mb-3">
          <TextInput placeholder="Passcode" />
        </div>
        <p className="text-sm">Having trouble in sign in?</p>
        <Button color="#EA4C89" block>
          Sign In
        </Button>
        <p className="text-sm text-center">Or Sign in with</p>
      </div>
    </div>
  );
}
