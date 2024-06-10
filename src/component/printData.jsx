const PrintData = ({ formHeader, formData }) => {
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
};

export default PrintData;
