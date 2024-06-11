import { useEffect, useState } from "react";
import PrintTable from "./component/printTable";
import Form from "./component/form";

function App() {
  const [formData, setFormData] = useState([]);
  const [formHeader, setFormHeader] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const modified_data = await data.json();

        const categoriesSet = new Set(modified_data.map(item => item.category));
        const tempArr = Array.from(categoriesSet).map(category => ({
          label: category, 
          value: category
        })) 

        setFormHeader(Object.keys(modified_data[0]));
        setFormData(modified_data);
        setCategories(tempArr);

      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, []);

  if (formData.length) {
    return (
      <>
        <PrintTable
          formHeader={formHeader}
          formData={formData}
          categories={categories}
          setFormData={setFormData}
        />
        <Form
          categories={categories}
          formData={formData}
          setFormData={setFormData}
        />
      </>
    );
  } else {
    return <> Loading .... </>;
  }
}

export default App;
