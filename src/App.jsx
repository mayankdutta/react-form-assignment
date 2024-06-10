import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const modified_data = await data.json();
        console.log(modified_data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, []);

  return (
    <>
      <div> Hello world </div>
    </>
  );
}

export default App;
