import { useContext } from "react";
import PrintTable from "./component/printTable";
import Form from "./component/form";
import { APIDataContext } from "./contexts/apiData";

function App() {
  const { loading } = useContext(APIDataContext);

  return (
    <>
      {!loading && <PrintTable />}   
      {loading && <h1>Loading Data ....</h1>}   
      <Form />
    </>
  );
}

export default App;
