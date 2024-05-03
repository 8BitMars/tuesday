import { Spinner } from "./Spinner";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  small?: boolean;
}
export const Button = ({
  disabled,
  isLoading,
  children,
  small,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`text-white rounded bg-primary-400 hover:bg-primary-500 disabled:bg-gray-300 ${className} ${
        small ? "py-1 px-2 text-sm" : "p-2"
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
      <Spinner isLoading={isLoading === true} />
    </button>
  );
};
