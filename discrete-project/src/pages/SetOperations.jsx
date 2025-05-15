import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

const SetOperations = () => {
    const[set_A, set_B] = useState(new Set([1,2,3,4]));




    return (
        <>
            <Navbar/>
            <h1>This is Set Operations</h1>
        </>
    );
};

export default SetOperations;