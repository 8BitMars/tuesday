import { useState } from "react";
import { SIGN_UP_URI } from "../constants/navigation";
import { useLogin } from "../hooks/auth/useLogin";
import { Spinner } from "../components/Spinner";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { isLoading, isError, login } = useLogin();
  const invalidLogin = isError;
  const validateEmail = () => {
    setIsValidEmail(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full max-w-md bg-white rounded shadow">
        <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
          <label htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              className={`w-full p-2 border border-gray-400 rounded ${
                isValidEmail ? "" : "border-red-600 bg-red-50"
              }`}
              required
            />
            {!isValidEmail && (
              <div className="mt-2 text-negative-600">Invalid email</div>
            )}
          </label>
          <label>
            <span>Password</span>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
            {invalidLogin && (
              <div className="mt-2 text-negative-600 peer-invalid:block">
                Invalid email or password
              </div>
            )}
          </label>

          <div className="text-sm">
            Don't have an account?{" "}
            <a className="text-blue-500 underline" href={SIGN_UP_URI}>
              Sign up here!
            </a>
          </div>

          <br />

          <button
            className="p-2 text-white rounded bg-primary-400 hover:bg-primary-500 disabled:bg-gray-300"
            disabled={!isValidEmail || password.length < 1 || isLoading}
          >
            Login <Spinner isLoading={isLoading} />
          </button>
        </form>
      </div>
    </div>
  );
};
