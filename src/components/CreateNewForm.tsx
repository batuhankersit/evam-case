import { Modal, Button } from "react-bootstrap";
//burda react-bootstrap kullandım çünkü normal bootstrapta modal için gerekli olan dosyaları
// import edemedim, search ettiğimde boostrapin jquery desteğini kestiği ile ilgili bir çok farklı yazı gördüm
// ve react-bootstrap kullanılması gerektiği yazılmıştı o yüzden sadece bu işlemde react-bootstrap kullanıldı.
import React, {FC, useState} from "react";
import {setItemOnStorage} from "../helpers";
import {IForm} from "../models/form.model";

interface Props {
  setFormList:(val:IForm[]) => void;
  formList:IForm[]
}

export const initialFormValues = {
  name:'',
  firstName:'',
  lastName:'',
  description:'',
  createdAt:'',
  age:undefined,
} as IForm

export const CreateNewForm:FC<Props> = ({setFormList,formList}) => {
  const [formItems,setFormItems] = useState<IForm>(initialFormValues)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onHandleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
    const date = new Date().toISOString().slice(0, 10);
    const newValue = [...formList,{...formItems,createdAt:date}]
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
        Yeni Form Oluştur
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Form Oluştur</Modal.Title>
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
                <input value={formItems.age} onChange={(e) => onValueChange('age',e.target.value)} type="number" className="form-control" id="age" placeholder="Age"
                       />
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Vazgeç
          </Button>
          <Button type={"submit"} variant="primary">
           Kaydet
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}