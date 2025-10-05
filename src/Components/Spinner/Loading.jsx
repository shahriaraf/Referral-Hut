import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <FaSpinner className="text-white text-4xl animate-spin" />
    </div>
  );
}
