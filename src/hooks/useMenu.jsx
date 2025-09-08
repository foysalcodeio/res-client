//import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             return response.json(); // ✅ Remove extra .json() call
    //         })
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error("Error:", error);
    //         });
    // }, []);

    const axiosPublic = useAxiosPublic();

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })
    return [menu, loading, refetch];
};

export default useMenu;
