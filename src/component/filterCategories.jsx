/* eslint-disable react/prop-types */
import Select from "react-select";
import "./filterCategories.css";
import { useContext } from "react";
import { APIDataContext } from "../contexts/apiData";

const FilterCategories = ({
  setSelectedOptions,
  header,
  isMultiProp = true,
  closeMenuOnSelectProp = false,
  selectedOptions,
}) => {
  const { categories } = useContext(APIDataContext);

  // console.log("categories: ", categories);
  // console.log(
  //   "checking react-select props: ",
  //   isMultiProp,
  //   closeMenuOnSelectProp
  // );

  const changeSelected = (selected) => {
    // console.log("checking selected : ", Object.values(selected));
    setSelectedOptions(selected);
  };

  return (
    <div className="filter-categories">
      {/* <div className="filter-categories-header">{header}</div> */}

      <Select
        closeMenuOnSelect={closeMenuOnSelectProp}
        isMulti={isMultiProp}
        options={categories}
        onChange={changeSelected}
        value={selectedOptions}
        placeholder={header}
        autoFocus
      />
    </div>
  );
};

export default FilterCategories;
