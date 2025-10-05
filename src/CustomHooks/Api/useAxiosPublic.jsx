import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL : 'https://nixto.vercel.app/'
    })
    return  axiosPublic;
};

export default useAxiosPublic;