/* eslint-disable react/prop-types */

import { useContext } from "react";
import { APIDataContext } from "../../contexts/apiData";
import FilterCategories from "../filterCategories";
import { DISABLED_COLUMNS } from "../../utils/extraFunctions";

const SORTING_COLUMNS = ["title", "price", "id"];

const TableHeader = ({ setSelectedOptions, sortInc, sortDec }) => {
  const { formHeader } = useContext(APIDataContext);

  return (
    <>
      {formHeader.map((header) => {
        if (DISABLED_COLUMNS.includes(header)) return null;
        else if (header == "category") {
          return (
            <th key={header}>
              <div className="filter-categories filter-categories-header">
                <FilterCategories
                  setSelectedOptions={setSelectedOptions}
                  header={header.toUpperCase()}
                />
              </div>
            </th>
          );
        } else if (SORTING_COLUMNS.includes(header)) {
          return (
            <>
              <th key={header}>
                <button onClick={() => sortInc(header)}>Inc</button>
                {" " + header.toUpperCase() + " "}
                <button onClick={() => sortDec(header)}>Dec</button>
              </th>
            </>
          );
        }

        return <th key={header}> {header.toUpperCase()}</th>;
      })}
      <th> DELETE </th>
    </>
  );
};

export default TableHeader;
