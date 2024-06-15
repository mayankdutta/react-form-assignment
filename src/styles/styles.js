import styled from "styled-components";

export const Button = styled.button`
  background: "white";
  color: ${(props) => {
    if (props.variant === "delete") return "red";
    if (props.variant === "submit") return "green";
  }};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-color: ${(props) => {
    if (props.variant === "delete") return "red";
    if (props.variant === "submit") return "green";
  }};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${(props) => {
      if (props.variant === "delete") return "red";
      if (props.variant === "submit") return "green";
    }};
    color: white;
  }
`;

export const Input = styled.input`
  padding: 0.5em;
  /* margin: 0.5em; */
  color: ${(props) => props.$inputColor || "#BF4F74"};
  background: papayawhip;
  border: none;
  width: 100%;
  border-radius: 3px;
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
`;

export const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #fff;

  tbody tr:nth-child(odd) {
    background-color: #fafafa;
  }
`;

export const Thead = styled.thead`
  th {
    text-align: left;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
    background-color: #f4f4f4;
    color: #000;
  }
`;

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #e0e0e0;
  }

  td {
    padding: 10px 15px;
    font-size: 14px;
    text-align: left;
  }

  tr:nth-child(odd) {
    background-color: #fafafa;
  }
`;

export const Tfoot = styled.thead`

  td {
    padding: 10px 15px;
    font-size: 14px;
    text-align: left;
  }

  tr:nth-child(odd) {
    background-color: #fafafa;
  }
`;
