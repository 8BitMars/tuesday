interface CreateNewCardProps extends React.PropsWithChildren {
  onCreate: () => void;
}
export const CreateNewCard = ({ onCreate, children }: CreateNewCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-64 p-4 text-2xl font-semibold bg-gray-100 rounded shadow-xl cursor-pointer text-text-400 hover:bg-gray-200 h-44"
      onClick={onCreate}
    >
      {children}
    </div>
  );
};
