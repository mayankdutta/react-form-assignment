/* eslint-disable react/prop-types */
import FilterCategories from "./filterCategories";
import { useState } from "react";
import "./printTable.css";

const PrintTable = ({ formHeader, formData, categories, setFormData }) => {
  const DISABLED_COLUMNS = ["rating", "image", "description"];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const limitNames = (name) => {
    if (typeof name !== "string") {
      return name;
    }
    return name.length < 20 ? name : name.substring(0, 40) + "...";
  };

  const filterStuff = (data) => {
    if (selectedOptions.length == 0) {
      return data;
    }
    let new_data = data.filter((d) => {
      return selectedOptions.find((value) => {
        return value.label === d.category;
      });
    });

    console.log(new_data);

    return new_data;
  };

  // const deleteRow = (id) => {

  //   console.log(`${id} is pressed`);

  //   setFormData(formData.filter((i) => {
  //     i !== id
  //   }));
  // }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <>
            {formHeader.map((header) => {
              if (DISABLED_COLUMNS.includes(header)) return null;
              else if (header == "category") {
                return (
                  <th key={header}>
                    <div className="filter-categories">
                      <div className="filter-categories-header">
                        {header.toUpperCase()}
                      </div>
                      <FilterCategories
                        categories={categories}
                        setSelectedOptions={setSelectedOptions}
                        header={""}
                      />
                    </div>
                  </th>
                );
              }
      
              return <th key={header}> {header.toUpperCase()}</th>;
            })}
            {/* <th> DELETE </th> */}
            </>
          </tr>
        </thead>

        <tbody>
          {filterStuff(formData).map((data, i) => (
            <tr key={i}>
              <>
              {Object.keys(data).map((value) => {
                if (DISABLED_COLUMNS.includes(value)) return null;
                else return <td key={value.id}>{limitNames(data[value])}</td>;
              })}
              {/* <td><button onClick = {() => deleteRow(data.id)}>X</button></td> */}
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintTable;
