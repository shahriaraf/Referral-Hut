import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvier";



const useAuth = () => {
     const auth = useContext(AuthContext)

    return  auth ;
};

export default useAuth;