import { Spinner } from "keep-react";

export default function ButtonAuth({ type, isLoading, text }) {
  return (
    <button
      type={type}
      className="w-full p-2.5 bg-primary hover:bg-primary/90 transition-colors rounded-lg text-white text-sm"
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="fill-white size-6" />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
