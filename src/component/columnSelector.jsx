const ColumnSelector = (props) => {
  const category = props.node.data.category;
  // {props.node.data.category}

  const { categories } = useContext(APIDataContext);
  const [selectedOptions, setSelectedOptions] = useState(category);

  return (
    <select
      value={selectedOptions}
      onChange={(e) => setSelectedOptions(e.target.value)}
    >
      {categories.map((c) => {
        return (
          <option key={c.label} value={c.label}>
            {c.label}
          </option>
        );
      })}
    </select>
  );
};

export default ColumnSelector;
