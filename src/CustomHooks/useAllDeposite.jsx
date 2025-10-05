import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './Api/useAxiosPublic';

const useAllDeposite = () => {
    const axiosPublic = useAxiosPublic()


    const {data : allDeposite = [],refetch,isLoading} = useQuery({
                queryKey : ['allDeposite'],
                queryFn : async () => {
                      const res = await axiosPublic.get('/api/find-deposite');
                      return res.data;
                }
    })

    return [allDeposite,refetch,isLoading]
};

export default useAllDeposite;