import { useContext, useState } from "react";
import FilterCategories from "../filterCategories";
import { APIDataContext } from "../../contexts/apiData";

const Footer = () => {
  const { useTableReducer } = useContext(APIDataContext);
  const { dispatch } = useTableReducer();
  const { categories } = useContext(APIDataContext);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [rowData, setRowData] = useState({
    title: "",
    price: "",
  });

  const handleChange = (event) => {
    setRowData({ ...rowData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // event.preventDefault();

    // console.log("row data: ", rowData);

    dispatch({
      type: "add",
      title: rowData.title,
      price: rowData.price,
      category: selectedOptions.label,
    });
  };

  return (
    <>
      <td>ID</td>

      <td>
        <input
          placeholder="Enter title"
          name="title"
          value={rowData.title}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          placeholder="Enter Price"
          name="price"
          value={rowData.price}
          onChange={handleChange}
        />
      </td>

      <td>
        <FilterCategories
          categories={categories}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          header={"Categories"}
          isMultiProp={false}
          closeMenuOnSelectProp={true}
        />
      </td>
      <td>
        <button type="submit" onClick={handleSubmit}>
          +
        </button>
      </td>
    </>
  );
};

export default Footer;
