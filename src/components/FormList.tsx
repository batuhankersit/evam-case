import {FC, useEffect, useState} from "react";
import Link from "next/link";
import {IForm} from "../models/form.model";

interface Props {
  searchText:string;
  formList:IForm[]
}

export const FormList:FC<Props> = ({searchText,formList}) => {
  const [filteredFormList,setFilteredFormList] = useState<IForm[]>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredList =
        formList.filter((x:IForm) => x?.name?.toLocaleLowerCase()
        .includes(searchText?.toLocaleLowerCase()))

        setFilteredFormList(filteredList)
    }, 500)
    return () => clearTimeout(timeout)
  }, [searchText])

  return (
    <div>
      <table className="table w-100">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Form Name</th>
          <th scope="col">Description</th>
          <th scope="col">Created Date</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Age</th>
          <th scope="col">Detail</th>
        </tr>
        </thead>
        <tbody>
        {(searchText ? filteredFormList : formList)?.map((item:IForm,index:number) => {
          return (
            <tr key={index+1}>
              <td scope="row">{index+1}</td>
              <td>{item?.name}</td>
              <td>{item?.description}</td>
              <td>{item?.createdAt}</td>
              <td>{item?.firstName}</td>
              <td>{item?.lastName}</td>
              <td>{item?.age}</td>
              <td>
                <Link href={`/forms/${item?.name}`}>
                  Details
                </Link>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}