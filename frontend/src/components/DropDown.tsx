import { Menu } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export interface DropDownProps {
  text: string | React.ReactNode;
  options: DropDownOption[];
}

export interface DropDownOption {
  text: string;
  link: string;
}

const animations = {
  hidden: {
    y: -30,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export const DropDown = ({ text, options }: DropDownProps) => {
  return (
    <Menu as="div" className="relative w-full h-full px-2 hover:font-semibold">
      {({ open }) => (
        <>
          <Menu.Button className="z-30 flex items-center h-full">
            {text}{" "}
            {open ? (
              <ChevronUpIcon height={12} width={12} className="mx-1" />
            ) : (
              <ChevronDownIcon height={12} width={12} className="mx-1" />
            )}
          </Menu.Button>
          {open && (
            <Menu.Items
              as={motion.div}
              variants={animations}
              initial="hidden"
              animate="visible"
              exit="hidden"
              static
              className="z-30 flex flex-col w-32 space-y-2 font-normal bg-white lg:left-0 lg:shadow lg:absolute lg:ring-1 lg:ring-black lg:ring-opacity-5 focus:outline-none"
            >
              {options.map((option, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <a
                      className={`inline-flex items-center border-b-2 p-3 gap-2 z-30 w-full ${
                        active
                          ? " border-primary-500"
                          : " border-transparent hover:border-gray-300 hover:text-text-700"
                      }`}
                      href={option.link}
                    >
                      {option.text}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
};
