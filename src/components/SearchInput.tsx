import { Dispatch, SetStateAction } from "react";
import { Input } from "~/components/ui/input";

type SearchInputProps = {
  setData: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

function SearchInput({ setData, placeholder }: SearchInputProps) {
  return (
    <>
      <Input
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
      />
    </>
  );
}

export default SearchInput;
