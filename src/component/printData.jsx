import FilterCategories from "./filterCategories";
import { useState } from "react";

const PrintData = ({ formHeader, formData, categories }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

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
            if (header === "rating" || header === "image")
              return <td key={header}></td>;
            if (header == "category") {
              return (
                <>
                  <FilterCategories
                    categories={categories}
                    setSelectedOptions={setSelectedOptions}
                  />
                  <th key={header}> {header}</th>
                </>
              );
            }
            return <th key={header}> {header}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {filterStuff(formData).map((data, i) => (
          <tr key={i}>
            {Object.keys(data).map((value) => {
              if (value === "rating" || value === "image")
                return <td key={value.id}></td>;
              else if (value === "description")
                return <td key={value.id}>{data[value].slice(0, 100)}</td>;
              else return <td key={value.id}>{data[value]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrintData;
