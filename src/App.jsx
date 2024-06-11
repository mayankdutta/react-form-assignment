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

        let tempFormHeader = [];
        for (let i in modified_data[0]) {
          tempFormHeader.push(i);
        }

        let st = new Set();
        for (let i in modified_data) {
          st.add(modified_data[i]["category"]);
        }

        console.log("set value: ", st);

        let st_array = Array.from(st);
        let temp_arr = [];

        for (let i in st_array) {
          temp_arr.push({ label: st_array[i], value: st_array[i] });
        }

        console.log("prining temp_arr: ", temp_arr);

        setFormHeader(tempFormHeader);
        setFormData(modified_data);
        setCategories(temp_arr);
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
        />
        <Form categories={categories} />
      </>
    );
  } else {
    return <> Loading .... </>;
  }
}

export default App;
