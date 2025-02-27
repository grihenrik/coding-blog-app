import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface LoadingProps {
  isLoading: boolean;
}
export default function Loading({ isLoading }: LoadingProps) {
  return (
    <div>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-500"
            size={100}
          />
        </div>
      )}
    </div>
  );
}
