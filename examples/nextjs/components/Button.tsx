  import { FC } from "react";
  
  export const Button: FC<{
    title: string;
    onClick: () => void;
  }> = ({ title, onClick }) => {
    return (
      <button
        className="m-1 rounded-md border border-current px-1 text-sm"
        onClick={onClick}
      >
        {title}
      </button>
    );
  };