import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from '../config/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyVerticallyCenteredModal(props) {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        userName: '',
        titleValid: '',
        descriptionValid: '',
        userNameValid: '',
    })
    const [formValidMsg,setErrMsg] = useState(false)
    const formValidation = () => {
        const { title, description, userName } = details
        if (title.length <= 0) {
            details.titleValid = "Title is missing"
            setErrMsg(false)
        }
        if (description.length <= 0) {
            details.descriptionValid = 'Description is missing'
            setErrMsg(false)
        }
        if (userName.length <= 0) {
            details.userNameValid = 'UserName is missing'
            setErrMsg(false)
        }
        setDetails({
            ...details,
        })
        setErrMsg({
            ...formValidMsg
        })
        return formValidMsg
    }
    const [successMsg, updateMsg] = useState(false)
    const submitForm = (e) => {
        e.preventDefault()
        if (formValidation()) {
            axios.post('/postQuery', details).then((msg) => {
                updateMsg("successfully posted")
                setTimeout(updateMsg(true), 1000)
                setErrMsg(true)
                setErrMsg({
                    ...formValidMsg
                })
            }).catch((err) => { console.log("err") })
        }else{
            toast.warn("Invalid Form")
        }

    }
    const getValue = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        switch (name) {
            case 'title': {
                if (value.length === 0) {
                    details.titleValid = "Title is missing"
                } else if (value.length < 10) {
                    details.titleValid = "Title must be at least 10 characters."
                } else {
                    details.titleValid = ''
                }
                break;
            }
            case 'userName': {
                if (value.length === 0) {
                    details.userNameValid = "UserName is missing"
                } else if (value.length < 3) {
                    details.userNameValid = "Username must be at least 3 characters."
                } else {
                    details.userNameValid = ''
                }
                break;
            }
            case 'description': {
                if (value.length === 0) {
                    details.descriptionValid = "Description is missing"
                } else if (value.length < 10) {
                    details.descriptionValid = "Description must be atleast 20 characters; you entered " + value.length
                } else {
                    details.descriptionValid = ''
                }
                break;
            }
            default:
                break;
        }
        setDetails({
            ...details,
            [name]: value
        })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton className="modal-head">
                <Modal.Title id="contained-modal-title-vcenter">
                    Post Your Question
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {successMsg ?
                    <div className="alert alert-success">Successfully posted</div> : null}
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" name="userName" onChange={getValue} className={`form-control ${details.userNameValid && 'is-invalid'}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {details.userNameValid !== '' ? <span className="text-danger">{details.userNameValid}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input type="text" name="title" onChange={getValue} className={`form-control ${details.titleValid && 'is-invalid'}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {details.titleValid !== '' ? <span className="text-danger">{details.titleValid}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <textarea type="text" name="description" onChange={getValue} rows="6"
                            className={`form-control ${details.descriptionValid && 'is-invalid'}`} />
                        {details.descriptionValid !== '' ? <span className="text-danger">{details.descriptionValid}</span> : null}
                    </div>
                    <button onClick={submitForm} className="btn btn-secondary button">+ Add Query</button>
                </form>
            </Modal.Body>
            <Modal.Footer className="modal-head">
                <Button onClick={props.onHide} className="button">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
function AddQuery() {
    const [modalShow, setModalShow] = React.useState(false);
    const [text, setValue] = useState("+")
    const changeValue = () => {
        let name = "+ Add Story"
        if (text === "+") {
            setValue(name)
        } else {
            let data = "+"
            setValue(data)
        }
    }
    const setModal = () => {
        setModalShow(true)
    }
    return (
        <Fragment>
            <ToastContainer />
            <button className="pulsbutton btn btn-dark" onClick={setModal} onMouseOver={changeValue} onMouseOut={changeValue}><span className="plusopp"><b>{text}</b></span></button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>
    )

}
export default AddQuery