import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // ✅ Remove extra .json() call
            })
            .then(data => {
                setMenu(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    return [menu, loading];
};

export default useMenu;
