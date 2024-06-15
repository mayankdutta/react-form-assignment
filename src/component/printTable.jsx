/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./printTable.css";
import TableBody from "./table/body";
import TableHeader from "./table/header";
import Footer from "./table/footer";
import { APIDataContext } from "../contexts/apiData";

const PrintTable = () => {
  const { useTableReducer, loading } = useContext(APIDataContext);
  const { state, dispatch } = useTableReducer();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const sortInc = (col) => dispatch({ type: "sortInc", col });
  const sortDec = (col) => dispatch({ type: "sortDec", col });
  const deleteRow = (id) => dispatch({ type: "delete", id });

  const filterStuff = (data) => {
    if (selectedOptions.length == 0) {
      return data;
    }
    return data.filter((d) => {
      return selectedOptions.find((value) => {
        return value.label === d.category.toUpperCase();
      });
    });
  };

  return (
    <div className="table-container">
      <table>
        {loading && <h1 style={loadingStyle}>Loading ... </h1>}

        <thead>
          <tr>
            {!loading && (
              <TableHeader
                setSelectedOptions={setSelectedOptions}
                sortInc={sortInc}
                sortDec={sortDec}
              />
            )}
          </tr>
        </thead>

        <tbody>
          {!loading &&
            filterStuff(state).map((data, i) => (
              <tr key={i}>
                <TableBody data={data} deleteRow={deleteRow} />
              </tr>
            ))}
        </tbody>

        <tfoot>
          <tr>
            <Footer />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PrintTable;

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
