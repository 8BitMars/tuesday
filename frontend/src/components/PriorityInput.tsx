import { FlagIcon } from "@heroicons/react/24/solid";

interface PriorityInputProps {
  onChange: (priority: number) => void;
  value: number;
}

export const PriorityInput = ({ onChange, value }: PriorityInputProps) => {
  return (
    <div className="flex flex-col">
      <div>Priority</div>
      <div className="flex gap-8">
        <FlagIcon
          width={32}
          height={32}
          onClick={() => onChange(1)}
          className={`hover:text-sharable-400 cursor-pointer ${
            value === 1 ? "text-sharable-300" : "text-icon-400"
          }`}
        />
        <FlagIcon
          width={32}
          height={32}
          onClick={() => onChange(2)}
          className={`hover:text-warning-500 cursor-pointer ${
            value === 2 ? "text-warning-400" : "text-icon-400"
          }`}
        />
        <FlagIcon
          width={32}
          height={32}
          onClick={() => onChange(3)}
          className={`hover:text-negative-500 cursor-pointer ${
            value === 3 ? "text-negative-400" : "text-icon-400"
          }`}
        />
      </div>
    </div>
  );
};
