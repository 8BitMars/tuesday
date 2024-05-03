import { useState } from "react";
import { LOGIN_URI } from "../constants/navigation";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../components/Button";
import { useSignUp } from "../hooks/auth/useSignUp";

const PasswordRequirement = ({
  condition,
  message,
}: {
  condition: boolean;
  message: string;
}) => {
  return condition ? (
    <span className="flex items-center gap-2 ml-4 text-positive-600">
      <CheckIcon height={16} width={16} color="green" />
      {message}
      <br />
    </span>
  ) : (
    <span className="flex items-center gap-2 ml-4 text-negative-600">
      <XMarkIcon height={16} width={16} />
      {message}
      <br />
    </span>
  );
};

export const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { signUp, isLoading, isError } = useSignUp();
  const passwordsMatch = password === confirmPassword;

  const validateEmail = () => {
    setIsValidEmail(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
    );
  };

  const validatePassword = () => {
    setIsValidPassword(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(password)
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ email, password, displayName });
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full max-w-md bg-white rounded shadow">
        <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="John Doe"
              required
            />
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              type="email"
              placeholder="johndoe@example.com"
              className={`w-full p-2 border border-gray-400 rounded ${
                isValidEmail ? "" : "border-red-600 bg-red-50"
              }`}
              required
            />
            {!isValidEmail && (
              <div className="mt-2 text-negative-600">Invalid email</div>
            )}
            {isError && (
              <div className="mt-2 text-negative-600">
                This email may already be in use
              </div>
            )}
          </label>
          <label>
            <span>Password</span>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              className={`w-full p-2 border border-gray-400 rounded peer ${
                isValidPassword ? "" : "border-red-600 bg-red-50 invalid"
              }`}
              required
            />
            <div className="hidden mt-2 peer-[.invalid]:block">
              <span className="text-negative-600">Password must contain:</span>
              <br />
              <PasswordRequirement
                condition={password.length >= 8}
                message="a minimum eight characters"
              />
              <PasswordRequirement
                condition={password !== password.toLowerCase()}
                message="at least one uppercase letter"
              />
              <PasswordRequirement
                condition={password !== password.toUpperCase()}
                message="at least one lowercase letter"
              />
              <PasswordRequirement
                condition={/(?=.*\d)/.test(password)}
                message="at least one number"
              />
            </div>
          </label>

          <label>
            <span>Confirm Password</span>
            <input
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border border-gray-400 rounded peer ${
                passwordsMatch ? "" : "border-red-600 bg-red-50"
              }`}
              required
            />
            {!passwordsMatch && (
              <div className="mt-2 text-negative-600">
                Passwords do not match
              </div>
            )}
          </label>

          <div className="text-sm">
            Already have an account?{" "}
            <a className="text-blue-500 underline" href={LOGIN_URI}>
              Login here!
            </a>
          </div>

          <br />
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={
              !isValidEmail ||
              !isValidPassword ||
              !passwordsMatch ||
              displayName.length < 1
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};
