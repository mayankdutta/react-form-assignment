/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./printTable.css";
import { APIDataContext } from "../contexts/apiData";
import TableBody from "./table/body";
import TableHeader from "./table/header";




const PrintTable = () => {
  const { formData } = useContext(APIDataContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { setFormData } = useContext(APIDataContext);

  const sortInc = (col) => {
    if (typeof col == "string") {
      setFormData(
        [...formData].sort((a, b) => {
          if (a[col] < b[col]) return -1;
          if (a[col] > b[col]) return 1;
          return 0;
        })
      );
    } else setFormData([...formData].sort((a, b) => a[col] - b[col]));
  };

  const sortDec = (col) => {
    if (typeof col == "string") {
      setFormData(
        [...formData].sort((a, b) => {
          if (a[col] < b[col]) return 1;
          if (a[col] > b[col]) return -1;
          return 0;
        })
      );
    } else setFormData([...formData].sort((a, b) => -a[col] + b[col]));
  };

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
            <TableHeader
              setSelectedOptions={setSelectedOptions}
              sortInc={sortInc}
              sortDec={sortDec}
            />
          </tr>
        </thead>

        <tbody>
          {filterStuff(formData).map((data, i) => (
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
