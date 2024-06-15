import { useContext, useState } from "react";
import FilterCategories from "../filterCategories";
import { APIDataContext } from "../../contexts/apiData";
import { Button, Input } from "../../styles/styles";

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
        <Input
          placeholder="Enter title"
          name="title"
          value={rowData.title}
          onChange={handleChange}
        />
      </td>

      <td>
        <Input
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
        <Button variant='submit' type="submit" onClick={handleSubmit}>
        
        <span>&#10010;</span>

        </Button>
      </td>
    </>
  );
};

export default Footer;
