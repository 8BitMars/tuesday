import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

const animations = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export interface ModalProps
{
  isVisible: boolean;
  toggleVisible: (nextValue?: any) => void;
  children?: React.ReactNode;
}

export const Modal = ({ isVisible, toggleVisible, children }: ModalProps) =>
{
  const closeModal = useCallback(() =>
  {
    toggleVisible(false);
  }, [toggleVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-0"
          variants={animations}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 cursor-pointer"
            onClick={closeModal}
          />
          <div className="relative z-40 flex flex-col items-start w-full max-w-sm gap-6 px-6 bg-white rounded-lg py-8">
            <button
              className="absolute right-4 top-4 focus:outline-none"
              onClick={closeModal}
            >
              <XMarkIcon className="w-6 h-6 fill-black hover:bg-red-50 hover:rounded hover:fill-red-500" />
            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
