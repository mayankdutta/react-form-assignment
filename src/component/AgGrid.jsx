import { useMemo, useContext, useRef, useState, useCallback } from "react";
import { APIDataContext } from "../contexts/apiData";
import { REDUCER_TYPE } from "../reducer/tableReducer";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Footer from "./table/footer";
import { Table, TableContainer, Tfoot } from "../styles/styles";
import { extraData } from "../utils/extraFunctions";

const AgGrid = () => {
  const { useTableReducer } = useContext(APIDataContext);
  const { dispatch } = useTableReducer();

  const gridRef = useRef(null);
  const trackUpdateRows = useRef([]);

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

  let getRowStyle = (params) => {
    const isUpdatedRow = trackUpdateRows.current.includes(
      params.node.rowIndex + 1
    );
    const isEvenRow = params.node.rowIndex % 2 == 0;

    const style = { backgroundColor: "white" };

    if (isEvenRow) {
      style.backgroundColor = "#EEEEEE";
    }
    if (isUpdatedRow) {
      style.border = "2px solid #3DC2EC";
    }

    return style;
  };

  const handleDelete = (id) =>
    dispatch({ type: REDUCER_TYPE.DELETE, id: parseInt(id) });

  const handleUpdatePrice = () => {
    const newData = [...formData].map((data) => {
      let chance = Math.random();
      if (chance > 0.5) {
        return data;
      }

      const updatedPrice =
        chance < 0.2
          ? (0.9 * data.price).toFixed(2)
          : (1.1 * data.price).toFixed(2);

      return { ...data, price: updatedPrice };
    });

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
  };

  const getRowId = useCallback((params) => params.data.id, []);

  const handleExtraRows = () => {
    const newRows = extraData(formData.length, 10);
    trackUpdateRows.current = newRows.map((row) => row.id);
    dispatch({ type: REDUCER_TYPE.EXTRA_ROW, extraRows: newRows });
    gridRef.current.api.redrawRows();
  };

  return (
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
          cellFadeDuration={20000}
          cellFlashDuration={200000}
          ref={gridRef}
          defaultColDef={defaultColDef}
        />
      </div>
      <TableContainer>
        <Table>
          <Tfoot>
            <tr>
              <Footer gridRef={gridRef} trackUpdateRows={trackUpdateRows} />
            </tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default AgGrid;
