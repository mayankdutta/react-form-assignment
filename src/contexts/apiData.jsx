/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useReducer, useRef } from "react";
import tableReducer, { REDUCER_TYPE } from "../reducer/tableReducer";
import { DISABLED_COLUMNS } from "../utils/extraFunctions";

export const APIDataContext = createContext();

export const APIDataProvider = ({ children }) => {
  const [formHeader, setFormHeader] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formDataState, dispatch] = useReducer(tableReducer, []);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        let modified_data = await data.json();

        const categoriesSet = new Set(
          modified_data.map((item) => item.category),
        );
        const tempArr = Array.from(categoriesSet).map((category) => ({
          label: category.toUpperCase(),
          value: category.toUpperCase(),
        }));

        modified_data = modified_data.map(
          ({ image, rating, description, ...rest }) => ({
            ...rest,
          }),
        );

        modified_data = modified_data.map((data) => ({
          ...data,
          price: parseFloat(data.price).toFixed(2),
        }));
        // console.log('printing stuff: ', modified_data)

        let tempFormHeader = Object.keys(modified_data[0])
          .filter((val) => !DISABLED_COLUMNS.includes(val))
          .map((t) => {
            return { field: t };
          });

        // tempFormHeader.add({ field: "Delete" });
        setFormHeader(tempFormHeader);

        // setFormData([...modified_data,  ...extraData(100)]);

        dispatch({
          type: REDUCER_TYPE.INITIALIZE,
          data: modified_data,
        });
        setCategories(tempArr);
      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, []);

  const useTableReducer = () => {
    return { state: formDataState, dispatch };
  };

  const value = {
    formData: formDataState,
    formHeader,
    categories,
    useTableReducer,
  };
  return (
    <APIDataContext.Provider value={value}>{children}</APIDataContext.Provider>
  );
};
