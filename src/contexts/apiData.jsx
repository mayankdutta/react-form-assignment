/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useReducer } from "react";
import tableReducer from "../reducer/tableReducer";
import { DISABLED_COLUMNS } from "../utils/extraFunctions";

export const APIDataContext = createContext();

export const APIDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [formHeader, setFormHeader] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(tableReducer, []);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        let modified_data = await data.json();

        const categoriesSet = new Set(
          modified_data.map((item) => item.category)
        );
        const tempArr = Array.from(categoriesSet).map((category) => ({
          label: category.toUpperCase(),
          value: category.toUpperCase(),
        }));

        modified_data = modified_data.map(({image, rating, ...rest}) => ({...rest}));
        // console.log('printing stuff: ', modified_data)

        setFormHeader(
          Object.keys(modified_data[0])
            .filter((val) => !DISABLED_COLUMNS.includes(val))
            .map((t) => {
              return { field: t };
            })
        );

        setFormData(modified_data);
        setCategories(tempArr);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    dispatch({ type: "initialize", data: formData });
  }, [formData]);

  const useTableReducer = () => {
    return { state, dispatch };
  };

  const value = {
    formData,
    formHeader,
    categories,
    loading,
    setFormData,
    useTableReducer,
  };
  return (
    <APIDataContext.Provider value={value}>{children}</APIDataContext.Provider>
  );
};
