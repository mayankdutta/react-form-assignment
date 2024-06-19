/*
 * TODO
 * update sales price.
 * button to add 10 more rows at the bottom
 *
 */

import { useMemo, useContext, useRef, useState, useCallback } from "react";
import { APIDataContext } from "../contexts/apiData";

import { REDUCER_TYPE } from "../reducer/tableReducer";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const AgGrid = () => {
  const { useTableReducer } = useContext(APIDataContext);
  const { dispatch } = useTableReducer();

  const gridRef = useRef();

  const { formData, formHeader } = useContext(APIDataContext);
  const [colDefs, setCallDefs] = useState([
    {
      field: "id",
    },
    {
      field: "title",
      floatingFilter: true,
    },
    {
      field: "price",
      cellRenderer: (props) => <>Rs. {props.node.data.price} </>,
    },
    { field: "category", floatingFilter: true },
    {
      field: "delete",
      cellRenderer: (props) => (
        <button onClick={() => handleDelete(props.node.data.id)}>X</button>
      ),
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      enableCellChangeFlash: true,
      cellStyle: { textAlign: "left" },
    };
  }, []);

  const getRowStyle = (params) => {
    // console.log(params);
    // console.log(params.node);

    if (params.node.rowIndex % 2 == 0) {
      return { backgroundColor: "#EEEEEE" };
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: REDUCER_TYPE.DELETE, id: parseInt(id) });
  };

  const handleUpdatePrice = () => {
    console.log("form data: ", formData);

    const newData = [...formData].map((data) => {
      let chance = Math.random();
      if (chance > 0.5) {
        return data;
      }

      return {
        ...data,
        price:
          chance < 0.2
            ? ((9 * data.price) / 10).toFixed(2)
            : ((11 * data.price) / 10).toFixed(2),
      };
    });

    console.log(newData);
    console.log("checking reducer: ", REDUCER_TYPE.INITIALIZE);
    dispatch({ type: REDUCER_TYPE.INITIALIZE, data: newData });
  };

  const handleDeleteMultipleRows = () => {
    /*
     * Method 1
     */
    // gridRef.current.api.forEachNode((node) => {
    //   if (node.isSelected()) {
    //     dispatch({ type: "delete", id: parseInt(node.data.id) });
    //   }
    // });

    /*
     * Method 2
     */

    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedNodesId = selectedNodes.map((node) => node.data.id);
    selectedNodesId.forEach((node) => {
      dispatch({ type: REDUCER_TYPE.DELETE, id: parseInt(node) });
    });

    console.log("selected nodes: ", selectedNodes);
  };

  const handleClickRow = (params) => {
    // console.log(params.data);
    // console.log(params.node);
    // console.log(params.api);
    // params.api.forEachNode((node) => {
    //   console.log(node.data.id, node.isSelected());
    // });
    // setSelectedRow([...selectedRow, params.data]);
  };

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  const handleExtraRows = () => {
    dispatch({ type: REDUCER_TYPE.EXTRA_ROW, extraRows: 10 });
  };

  return (
    // wrapping container with theme & size
    <>
      <button onClick={handleDeleteMultipleRows}> Delete Selected Rows </button>
      <button onClick={handleUpdatePrice}> Update Price for Sales</button>
      <button onClick={handleExtraRows}>Add extra rows </button>

      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={formData}
          getRowId={getRowId}
          getRowStyle={getRowStyle}
          rowSelection="multiple"
          columnDefs={colDefs}
          ref={gridRef}
          defaultColDef={defaultColDef}
          onRowClicked={handleClickRow}
        />
      </div>
    </>
  );
};
export default AgGrid;
