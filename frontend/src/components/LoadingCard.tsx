const borderColors = [
  "border-primary-300",
  "border-positive-300",
  "border-warning-300",
  "border-negative-300",
  "border-sharable-300",
  "border-secret-300",
  "border-primary-300",
  "border-positive-300",
  "border-warning-300",
  "border-negative-300",
  "border-sharable-300",
  "border-secret-300",
];

interface LoadingCardProps {
  index?: number;
}
export const LoadingCard = ({ index = 0 }: LoadingCardProps) => {
  const borderColor = borderColors[index % borderColors.length];
  return (
    <div
      className={`flex animate-pulse flex-col gap-8 w-64 p-4 border-l-4 ${borderColor} bg-icon-100 rounded shadow-xl h-44`}
    >
      <div className="flex gap-2 text-icon-200 place-self-end">
        <div className="w-8 h-8 rounded-full bg-icon-200" />
      </div>
      <div className="grid grid-cols-4 gap-10">
        <div className="h-6 col-span-2 col-start-2 rounded bg-icon-200" />
        <div className="h-2 col-span-2 col-start-3 rounded place-content-end bg-icon-200" />
      </div>
    </div>
  );
};
