// src/CustomHooks/useAuth.js (or similar path)

import { useContext } from 'react';
// Change this line to use curly braces for a named import
import { AuthContext } from '../Context/AuthProvider'; 

const useAuth = () => useContext(AuthContext);

export default useAuth;