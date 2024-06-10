import { useEffect, useState } from "react";
import PrintData from "./component/printData";

function App() {
  const [formData, setFormData] = useState([]);
  const [formHeader, setFormHeader] = useState([]);
  const [categories, setCategories] = useState(new Set());

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
          st.add(modified_data[i]['category']);
        }

        setFormHeader(tempFormHeader);
        setFormData(modified_data);
        setCategories(st);

      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, []);


  if (formData.length) {
    return (

<PrintData formHeader={formHeader} formData={formData.slice(0, 5)} />

    );
  } else {
    return <> Loading .... </>;
  }
}

export default App;
