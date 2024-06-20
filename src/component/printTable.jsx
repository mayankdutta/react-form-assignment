/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// import "./printTable.css";
import TableBody from "./table/body";
import TableHeader from "./table/header";
import Footer from "./table/footer";
import { APIDataContext } from "../contexts/apiData";

import { Table, TableContainer, Thead, Tbody, Tfoot } from "../styles/styles";
import AgGrid from "./AgGrid";

const PrintTable = () => {
  const { useTableReducer, loading } = useContext(APIDataContext);

  return (
    <>
      <AgGrid />
      <TableContainer>
        <Table>
          {loading && <h1>Loading ... </h1>}

          {/* <Thead>
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
        </Tbody> */}

          <Tfoot>
            <tr>
              {/* <Footer /> */}
            </tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default PrintTable;
