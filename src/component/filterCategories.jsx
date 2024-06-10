import { useEffect } from "react";
import Select from "react-select";

const FilterCategories = ({ categories, setSelectedOptions, header }) => {
  console.log("categories: ", categories);

  const changeSelected = (selected) => {
    console.log("validating stuff: ", Object.values(selected));
    setSelectedOptions(selected);
  };

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={categories}
      onChange={changeSelected}
      placeholder={"Choose " + header}
      autoFocus
    />
  );
};

export default FilterCategories;
