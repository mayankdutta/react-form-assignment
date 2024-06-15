/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// import "./printTable.css";
import TableBody from "./table/body";
import TableHeader from "./table/header";
import Footer from "./table/footer";
import { APIDataContext } from "../contexts/apiData";

import { Table, TableContainer, Thead, Tbody, Tfoot } from "../styles/styles";

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
    <TableContainer>
      <Table>
        {loading && <h1>Loading ... </h1>}

        <Thead>
          <tr>
            {!loading && (
              <TableHeader
                setSelectedOptions={setSelectedOptions}
                sortInc={sortInc}
                sortDec={sortDec}
              />
            )}
          </tr>
        </Thead>

        <Tbody>
          {!loading &&
            filterStuff(state).map((data, i) => (
              <tr key={i}>
                <TableBody data={data} deleteRow={deleteRow} />
              </tr>
            ))}
        </Tbody>

        <Tfoot>
          <tr>
            <Footer />
          </tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default PrintTable;
