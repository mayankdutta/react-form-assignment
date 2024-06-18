import { useMemo, useContext, useRef, useState, useReducer } from "react";
import { APIDataContext } from "../contexts/apiData";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const DeleteStuff = (p) => {
  const { useTableReducer } = useContext(APIDataContext);
  const { dispatch } = useTableReducer();

  const handleDelete = () => {
    dispatch({ type: "delete", id: parseInt(p.node.data.id) });
  };

  return <button onClick={handleDelete}>X</button>;
};
const AgGrid = () => {
  const { formData, formHeader } = useContext(APIDataContext);
  const [colDefs, setCallDefs] = useState([
    {
      field: "id",
    },
    {
      field: "title", floatingFilter: true
    },
    { field: "price" },
    { field: "category", floatingFilter: true },
    { field: "delete", cellRenderer: DeleteStuff },
  ]);
  const gridRef = useRef();

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
    };
  }, []);

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={formData}
        columnDefs={colDefs}
        ref={gridRef}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};
export default AgGrid;
