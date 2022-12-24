import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getItemFromStorage} from "../../src/helpers";
import {initialFormValues} from "../../src/components/CreateNewForm";
import {IForm} from "../../src/models/form.model";

export const FormDetails = () => {
  const [formDetails,setFormDetails] = useState<IForm>(initialFormValues)
  const router = useRouter()
  const {formName} = router.query

  useEffect(() => {
  if(formName){
    const data = getItemFromStorage('data',[]) as IForm[]
    const filteredItem = data.find((x:IForm) => x.name === formName) || {} as IForm
    setFormDetails(filteredItem)
  }
  },[formName])

  return (
    <div className={"w-100 px-3"}>
        <form className={"w-100"}>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="formName">Form Name</label>
                <input defaultValue={formDetails?.name} type="text" className="form-control" id="formName" placeholder="Form name"
                       />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="description">Description</label>
                <input defaultValue={formDetails?.description} type="text" className="form-control" id="description" placeholder="Description"
                       />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="createdAt">Created Date</label>
                <input defaultValue={formDetails?.createdAt} type="text" className="form-control" id="createdAt" placeholder="Created Date"
                        disabled/>
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="name">First Name</label>
                <input defaultValue={formDetails?.firstName} type="text" className="form-control" id="name" placeholder="Name"
                       />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input defaultValue={formDetails?.lastName} type="text" className="form-control" id="lastName" placeholder="Last Name"
                       />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="age">Age</label>
                <input defaultValue={formDetails?.age} type="number" className="form-control" id="age" placeholder="Age"
                />
              </div>
            </div>
        </form>
      <button onClick={() => router.back()} type="button" className="btn btn-primary">Back</button>
    </div>
  )
}

export default FormDetails