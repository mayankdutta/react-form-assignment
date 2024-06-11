/* eslint-disable react/prop-types */
import { useState } from "react";
import FilterCategories from "./filterCategories";
import "./form.css";

const Form = ({ categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        Enter new Details
        <input
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          placeholder="Enter Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <FilterCategories
          categories={categories}
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
