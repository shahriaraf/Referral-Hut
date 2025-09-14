import { useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";


const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
    return (
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
            <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors">
                Sign Out
            </button>
        </div>
    );
};

export default SignOut;