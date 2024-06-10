import { useEffect } from "react";
import Select from "react-select";

const FilterCategories = ({ categories, setSelectedOptions }) => {
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
      autoFocus
    />
  );
};

export default FilterCategories;
