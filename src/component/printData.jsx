import FilterCategories from "./filterCategories";
import { useState } from "react";

const PrintData = ({ formHeader, formData, categories }) => {
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

  return (
    <table>
      <thead>
        <tr>
          {formHeader.map((header) => {
            if (DISABLED_COLUMNS.includes(header))
              return <td key={header}></td>;
            else if (header == "category") {
              return (
                <th style={{ width: "250px" }}>
                  <FilterCategories
                    categories={categories}
                    setSelectedOptions={setSelectedOptions}
                    header={header.toUpperCase()}
                  />
                </th>
              );
            }
            return <th key={header}> {header.toUpperCase()}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {filterStuff(formData).map((data, i) => (
          <tr key={i}>
            {Object.keys(data).map((value) => {
              if (DISABLED_COLUMNS.includes(value))
                return <td key={value.id}></td>;
              else return <td key={value.id}>{limitNames(data[value])}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrintData;
