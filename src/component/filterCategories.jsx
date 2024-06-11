/* eslint-disable react/prop-types */
import Select from "react-select";
import './filterCategories.css';
import React, { CSSProperties } from 'react';


const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};


const FilterCategories = ({
  categories,
  setSelectedOptions,
  header,
  isMultiProp = true,
  closeMenuOnSelectProp = false,
}) => {
  console.log("categories: ", categories);
  console.log(
    "checking react-select props: ",
    isMultiProp,
    closeMenuOnSelectProp
  );

  const changeSelected = (selected) => {
    console.log("checking selected : ", Object.values(selected));
    setSelectedOptions(selected);
  };

  return (
    <div className="filter-categories">
      <div className="filter-categories-header">{header}</div>

      <Select
        closeMenuOnSelect={closeMenuOnSelectProp}
        isMulti={isMultiProp}
        options={categories}
        onChange={changeSelected}
        placeholder={"Choose " + header}
        autoFocus
      />
    </div>
  );
};

export default FilterCategories;
