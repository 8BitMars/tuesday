import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
export const Banner = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full h-auto py-2 text-sm leading-8 text-white bg-logogreen-500 lg:h-12 lg:p-0">
      <GlobeEuropeAfricaIcon
        height={16}
        width={16}
        className="mx-1"
        color="#0073ea"
      />{" "}
      New to Tuesday? Sign up - free - to copy this template!
      <button className="px-2 mx-2 text-white rounded bg-primary-400 hover:bg-primary-500">
        Get Started
      </button>
      <a className="underline" href="/">
        Explore more templates
      </a>
    </div>
  );
};
