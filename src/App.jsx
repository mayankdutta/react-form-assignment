import { useContext } from "react";
import PrintTable from "./component/printTable";
import Form from "./component/form";
import { APIDataContext } from "./contexts/apiData";
import "./App.css";
function App() {
  const { loading } = useContext(APIDataContext);

  return (
    <div>
      <>
        {!loading && <PrintTable />}
        {loading && <h1 style={loadingStyle}>Loading ....</h1>}
      </>
      <Form />
    </div>
  );
}

const loadingStyle = {
  textAlign: "left",
  padding: "10px 15px",
  fontSize: "40px",
  fontWeight: "bold",
  color: "#000",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
  backgroundColor: "#f4f4f4",
};

export default App;
