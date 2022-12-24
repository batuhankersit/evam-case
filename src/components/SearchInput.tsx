import {SearchIcon} from "../icons/SearchIcon";
import {FC} from "react";

interface Props {
  setSearchText:(data:string) => void;
  searchText:string | undefined;
}

export const SearchInput:FC<Props> = ({searchText,setSearchText}) => {

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <SearchIcon/>
        </span>
      </div>
      <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} className="form-control"
             placeholder="Search with Form Name"
             />
    </div>
  )
}