/* eslint-disable react/prop-types */

import { limitNames, DISABLED_COLUMNS } from "../../utils/extraFunctions";
import { Button } from "../../styles/styles";

const TableBody = ({ data, deleteRow }) => {
  return (
    <>
      {Object.keys(data).map((value) => {
        if (DISABLED_COLUMNS.includes(value)) return null;
        else return <td key={value.id}>{limitNames(data[value])}</td>;
      })}
      <td>
        <Button variant='delete' onClick={() => deleteRow(data.id)}><span>&#10539;</span></Button>
      </td>
    </>
  );
};

export default TableBody;
