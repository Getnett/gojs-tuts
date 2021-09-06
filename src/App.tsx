import { useEffect, useState } from "react";
import { familyTreeData } from "./api/data";
import { NodeData } from "./api/types";
import DiagramWrapper from "./components/DiagramWrapper";

const App: React.FC = () => {
    const [nodeTreeData, setNodeTreeData] = useState<NodeData[]>([]);
    useEffect(() => {
        // This can be simulated data from remote resource
        setNodeTreeData(familyTreeData);
    }, []);
    return <DiagramWrapper nodeDataArray={nodeTreeData} />;
};
export default App;
