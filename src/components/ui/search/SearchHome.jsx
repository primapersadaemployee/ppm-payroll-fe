import { Input, InputIcon } from "keep-react";
import { MagnifyingGlass } from "phosphor-react";

export default function SearchHome() {
  return (
    <fieldset className="relative w-full">
      <Input placeholder="Search Anything" className="ps-11" />
      <InputIcon>
        <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
      </InputIcon>
    </fieldset>
  );
}
