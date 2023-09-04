import { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
  setData: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

function SearchInput({ setData, placeholder }: SearchInputProps) {
  return (
    <>
      <input
        type="text"
        className="basic-input"
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
      />
    </>
  );
}

export default SearchInput;
