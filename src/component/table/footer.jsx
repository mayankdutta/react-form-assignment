/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import FilterCategories from "../filterCategories";
import { APIDataContext } from "../../contexts/apiData";
import { Button, Input } from "../../styles/styles";
import { REDUCER_TYPE } from "../../reducer/tableReducer";

const Footer = ({ gridRef, trackUpdateRows }) => {
  const { useTableReducer, formData } = useContext(APIDataContext);
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
    trackUpdateRows.current = [formData.length + 1];

    dispatch({
      type: REDUCER_TYPE.ADD,
      title: rowData.title,
      price: parseInt(rowData.price),
      category: selectedOptions.label?.toLowerCase(),
    });

    gridRef.current.api.redrawRows();

    console.log('trackupdates @footer: ', trackUpdateRows); 
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
        <Button variant="submit" type="submit" onClick={handleSubmit}>
          <span>&#10010;</span>
        </Button>
      </td>
    </>
  );
};

export default Footer;
