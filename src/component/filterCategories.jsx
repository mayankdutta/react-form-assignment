/* eslint-disable react/prop-types */
import Select from "react-select";
// import "./filterCategories.css";
import { useContext } from "react";
import { APIDataContext } from "../contexts/apiData";
import { customStyles } from "../styles/SelectStyles";

const FilterCategories = ({
  setSelectedOptions,
  header,
  isMultiProp = true,
  closeMenuOnSelectProp = false,
  selectedOptions,
}) => {
  const { categories } = useContext(APIDataContext);

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
        placeholder={header.length ? header : selectedOptions}
        autoFocus
        styles={{ customStyles }}
      />
    </div>
  );
};

export default FilterCategories;
