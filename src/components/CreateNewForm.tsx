import { Modal, Button } from "react-bootstrap";
import React, {FC, useState} from "react";
import {IForm} from "./FormList";
import {setItemOnStorage} from "../helpers";

interface Props {
  setFormList:(val:IForm[]) => void;
  formList:IForm[]
}

const initialFormValues = {
  name:'',
  firstName:'',
  lastName:'',
  description:'',
  createdAt:'',
  age:0,
} as IForm

export const CreateNewForm:FC<Props> = ({setFormList,formList}) => {
  const [formItems,setFormItems] = useState<IForm>(initialFormValues)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onHandleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
    const date = new Date()
    const newValue = [...formList,{...formItems,createdAt:date.toDateString()}]
    setFormList(newValue)
    setItemOnStorage('data',newValue)
    setFormItems(initialFormValues)
    handleClose()
  }

  const onValueChange = (key:string,value:any) => {
    const newItems = {...formItems,[key]:value}
    setFormItems(newItems)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Form
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Form</Modal.Title>
        </Modal.Header>
        <form onSubmit={onHandleSubmit} className={"w-100"}>
        <Modal.Body>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="formName">Form Name</label>
                <input value={formItems.name} onChange={(e) => onValueChange('name',e.target.value)} type="text" className="form-control" id="formName" placeholder="Form name"
                       required/>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="description">Description</label>
                <input value={formItems.description} onChange={(e) => onValueChange('description',e.target.value)} type="text" className="form-control" id="description" placeholder="Description"
                        required/>
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="name">First Name</label>
                <input value={formItems.firstName} onChange={(e) => onValueChange('firstName',e.target.value)}  type="text" className="form-control" id="name" placeholder="Name"
                       required/>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input value={formItems.lastName} onChange={(e) => onValueChange('lastName',e.target.value)} type="text" className="form-control" id="lastName" placeholder="Last Name"
                       required/>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="age">Age</label>
                <input min={1} value={formItems.age} onChange={(e) => onValueChange('age',e.target.value)} type="number" className="form-control" id="age" placeholder="Age"
                       />
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type={"submit"} variant="primary">
           Submit
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}