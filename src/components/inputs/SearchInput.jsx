import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="mb-4 w-full">
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
