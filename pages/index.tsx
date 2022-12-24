import {FormList} from "../src/components/FormList";
import {SearchInput} from "../src/components/SearchInput";
import {useEffect, useState} from "react";
import {CreateNewForm} from "../src/components/CreateNewForm";
import {getItemFromStorage} from "../src/helpers";
import {IForm} from "../src/models/form.model";

export default function Home() {
  const [searchText,setSearchText] = useState<string>('')
  const [formList,setFormList] = useState<IForm[]>([]);

  useEffect(() => {
    const data = getItemFromStorage('data',[])
    setFormList(data)
  },[])

  return (
    <>
      <main>
        <CreateNewForm formList={formList} setFormList={setFormList} />
        <SearchInput setSearchText={setSearchText} searchText={searchText} />
        <FormList searchText={searchText} formList={formList} />
      </main>
    </>
  )
}
