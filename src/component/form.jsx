/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import FilterCategories from "./filterCategories";
import { APIDataContext } from "../contexts/apiData";
import "./form.css";

const Form = () => {
  const { categories, formData, setFormData } = useContext(APIDataContext);

  const [rowData, setRowData] = useState({
    title: "",
    price: "",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("checking form data: ", formData);

    // console.log(
    //   "checking form submit: ",
    //   formData.length ? formData[formData.length - 1].id + 1 : 1,
    //   rowData.title,
    //   rowData.price,
    //   selectedOptions.label
    // );

    setFormData([
      ...formData,
      {
        id: formData.length ? formData[formData.length - 1].id + 1 : 1,
        title: rowData.title,
        price: rowData.price,
        category: selectedOptions.label,
      },
    ]);

    setRowData({ title: "", price: "" });
    setSelectedOptions(null);
  };

  const handleChange = (event) => {
    setRowData({ ...rowData, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div style ={headingStyle}>Enter new Details </div>
        <input
          placeholder="Enter title"
          name="title"
          value={rowData.title}
          onChange={handleChange}
        />
        <input
          placeholder="Enter Price"
          name="price"
          value={rowData.price}
          onChange={handleChange}
        />
        <FilterCategories
          categories={categories}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          header={"Categories"}
          isMultiProp={false}
          closeMenuOnSelectProp={true}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

const headingStyle = {
  textAlign: "left",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#000",
  fontFamily: "Arial, sans-serif"
};
