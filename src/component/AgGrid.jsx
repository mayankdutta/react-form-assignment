/* eslint-disable react/prop-types */
import { useMemo, useContext, useRef, useState, useCallback } from "react";
import { APIDataContext } from "../contexts/apiData";
import { REDUCER_TYPE } from "../reducer/tableReducer";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./AgGrid.css";
import Select from "react-select";

import Footer from "./table/footer";
import { Table, TableContainer, Tfoot } from "../styles/styles";
import { extraData } from "../utils/extraFunctions";
import FilterCategories from "./filterCategories";

const AgGrid = () => {
  const { useTableReducer, formData, categories } = useContext(APIDataContext);
  const { dispatch } = useTableReducer();

  const gridRef = useRef(null);
  const trackUpdateRows = useRef([]);
  const [selected, setSelected] = useState();

  const colDefs = [
    {
      field: "id",
    },
    {
      field: "title",
      floatingFilter: true,
      editable: true,
    },
    {
      field: "price",
      // cellRenderer: (props) => <>Rs. {props.node.data.price} </>,
      valueFormatter: (props) => "Rs. " + props.node.data.price,
      editable: true,
    },
    {
      field: "category",
      editable: true,

      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: categories.map((c) => c.label) },
    },
    {
      field: "delete",
      cellRenderer: (props) => (
        <button onClick={() => handleDelete(props.node.data.id)}>X</button>
      ),
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      enableCellChangeFlash: true,

      cellStyle: { textAlign: "left" },
      cellEditorPopup: true,
    };
  }, []);

  let getRowStyle = (params) => {
    const isUpdatedRow = trackUpdateRows.current.includes(
      params.node.rowIndex + 1,
    );

    const isEvenRow = params.node.rowIndex % 2 == 0;
    const style = { backgroundColor: "white" };

    if (isEvenRow) style.backgroundColor = "#EEEEEE";
    if (isUpdatedRow) style.border = "2px solid #3DC2EC";

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

      let tempRowNode = gridRef.current.api.getDisplayedRowAtIndex(4);

      gridRef.current.api.flashCells({
        rowNodes: [tempRowNode],
        cellFadeDuration: 200,
        flashDuration: 200,
      });

      return { ...data, price: updatedPrice };
    });

    dispatch({ type: REDUCER_TYPE.INITIALIZE, data: newData });
  };

  const handleDeleteMultipleRows = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedNodesId = selectedNodes.map((node) => node.data.id);
    selectedNodesId.forEach((node) => {
      dispatch({ type: REDUCER_TYPE.DELETE, id: parseInt(node) });
    });
  };

  const getRowId = (params) => params.data.id + params.data.title;

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
          onGridReady={handleOnGridReady}
          rowData={formData}
          getRowId={getRowId}
          getRowStyle={getRowStyle}
          rowSelection="multiple"
          ref={gridRef}
          columnDefs={colDefs}
          animateRows={true}
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

const ColumnSelector = (props) => {
  const category = props.node.data.category;
  // {props.node.data.category}

  const { categories } = useContext(APIDataContext);
  const [selectedOptions, setSelectedOptions] = useState(category);

  return (
    <select
      value={selectedOptions}
      onChange={(e) => setSelectedOptions(e.target.value)}
    >
      {categories.map((c) => {
        return (
          <option key={c.label} value={c.label}>
            {c.label}
          </option>
        );
      })}
    </select>
  );
};

export default AgGrid;
