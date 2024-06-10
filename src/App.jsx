import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState([]);
  const [formHeader, setFormHeader] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const modified_data = await data.json();


        let tempFormHeader = [];
        for (let i in modified_data[0]) {
          tempFormHeader.push(i);
        }

        console.log(modified_data);

        setFormHeader(tempFormHeader);
        setFormData(modified_data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, []);

  if (formData.length) {
    return (
      <table>
        <tr>
          {formHeader.map((header) => {
            if (header === "rating" || header === "image")
              return <td key={header}></td>;
            return <th key={header}> {header}</th>;
          })}
        </tr>

        {formData.map((data, i) => (
          <tr key={i}>
            {Object.keys(data).map((value) => {
              if (value === "rating" || value === "image")
                return <td key={value.id}></td>;
              else return <td key={value.id}>{data[value]}</td>;
            })}
          </tr>
        ))}
      </table>
    );
  } else {
    return <> Loading .... </>;
  }
}

export default App;
