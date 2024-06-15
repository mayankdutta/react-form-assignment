/* eslint-disable react/prop-types */

import { limitNames, DISABLED_COLUMNS } from "../../utils/extraFunctions";

const TableBody = ({ data, deleteRow }) => {
  return (
    <>
      {Object.keys(data).map((value) => {
        if (DISABLED_COLUMNS.includes(value)) return null;
        else return <td key={value.id}>{limitNames(data[value])}</td>;
      })}
      <td>
        <button onClick={() => deleteRow(data.id)}>X</button>
      </td>
    </>
  );
};

export default TableBody;
