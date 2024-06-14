/* eslint-disable react/prop-types */
import { useContext, useReducer, useState } from "react";
import "./printTable.css";
import { APIDataContext } from "../contexts/apiData";
import TableBody from "./table/body";
import TableHeader from "./table/header";

const tableReducer = (state, action) => {
  const { col, id } = action;

  switch (action.type) {
    case "sortInc": {
      return typeof col == "string"
        ? [...state].sort((a, b) => {
            if (a[col] < b[col]) return -1;
            if (a[col] > b[col]) return 1;
            return 0;
          })
        : [...state``].sort((a, b) => a[col] - b[col]);
    }

    case "sortDec": {
      return typeof col == "string"
        ? [...state].sort((a, b) => {
            if (a[col] < b[col]) return 11;
            if (a[col] > b[col]) return -1;
            return 0;
          })
        : [...state].sort((a, b) => -a[col] + b[col]);
    }

    case "delete":
      console.log("iam here, id: ", id);
      return state.filter((i) => i.id !== id);

    default:
      throw new Error("unhandled action ", action.type);
  }
};

const PrintTable = () => {
  const { formData } = useContext(APIDataContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { setFormData } = useContext(APIDataContext);

  const [state, dispatch] = useReducer(tableReducer, formData);

  const sortInc = (col) => dispatch({ type: "sortInc", col });
  const sortDec = (col) => dispatch({ type: "sortDec", col });
  const deleteRow = (id) => dispatch({ type: "delete", id });

  const filterStuff = (data) => {
    if (selectedOptions.length == 0) {
      return data;
    }
    return data.filter((d) => {
      return selectedOptions.find((value) => {
        return value.label === d.category.toUpperCase();
      });
    });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <TableHeader
              setSelectedOptions={setSelectedOptions}
              sortInc={sortInc}
              sortDec={sortDec}
            />
          </tr>
        </thead>

        <tbody>
          {filterStuff(state).map((data, i) => (
            <tr key={i}>
              <TableBody data={data} deleteRow={deleteRow} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintTable;
