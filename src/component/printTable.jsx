/* eslint-disable react/prop-types */
import FilterCategories from "./filterCategories";
import { useContext, useState } from "react";
import "./printTable.css";
import { APIDataContext } from "../contexts/apiData";

const limitNames = (name) => {
  if (typeof name !== "string") {
    return name;
  }
  return name.length < 20 ? name : name.substring(0, 40) + "...";
};

const DISABLED_COLUMNS = ["rating", "image", "description"];

const PrintTable = () => {
  const { formData } = useContext(APIDataContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { setFormData } = useContext(APIDataContext);

  const filterStuff = (data) => {
    if (selectedOptions.length == 0) {
      return data;
    }
    return data.filter((d) => {
      return selectedOptions.find((value) => {
        // console.log(
        //   `value label: ${value.label}, category: ${d.category}`
        // );
        return value.label === d.category.toUpperCase();
      });
    });
  };

  const deleteRow = (id) => {
    // console.log(`${id} is pressed`);
    setFormData(formData.filter((i) => i.id !== id));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <TableHeader setSelectedOptions={setSelectedOptions} />
          </tr>
        </thead>

        <tbody>
          {filterStuff(formData).map((data, i) => (
            <tr key={i}>
              <TableRow data={data} deleteRow={deleteRow} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ data, deleteRow }) => {
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

const TableHeader = ({ setSelectedOptions }) => {
  const { formHeader } = useContext(APIDataContext);

  return (
    <>
      {formHeader.map((header) => {
        if (DISABLED_COLUMNS.includes(header)) return null;
        else if (header == "category") {
          return (
            <th key={header}>
              <div className="filter-categories filter-categories-header">
                {/* <div className="filter-categories-header">
                  {header.toUpperCase()}
                </div> */}
                <FilterCategories
                  setSelectedOptions={setSelectedOptions}
                  header={header.toUpperCase()}
                />
              </div>
            </th>
          );
        }

        return <th key={header}> {header.toUpperCase()}</th>;
      })}
      <th> DELETE </th>
    </>
  );
};

export default PrintTable;
