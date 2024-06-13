/* eslint-disable react/prop-types */

const DISABLED_COLUMNS = ["rating", "image", "description"];


const limitNames = (name) => {
  if (typeof name !== "string") {
    return name;
  }
  return name.length < 20 ? name : name.substring(0, 40) + "...";
};

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
