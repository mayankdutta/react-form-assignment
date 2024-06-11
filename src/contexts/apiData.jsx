/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const APIDataContext = createContext();

export const APIDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [formHeader, setFormHeader] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const modified_data = await data.json();

        const categoriesSet = new Set(
          modified_data.map((item) => item.category)
        );
        const tempArr = Array.from(categoriesSet).map((category) => ({
          label: category,
          value: category,
        }));

        setFormHeader(Object.keys(modified_data[0]));
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

  const value = {
    formData,
    formHeader,
    categories,
    loading,
    setFormData
  };
  return (
    <APIDataContext.Provider value={value}>{children}</APIDataContext.Provider>
  );
};
