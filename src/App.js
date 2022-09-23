import React, { useState } from "react";
import User from "./pages/user";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import './style.css'
import axios from "axios";

const App = () => {
    const [value, setValue] = useState({})
    const [key, setKey] = useState(false)
    const [name, setName] = useState('Add New User')
    const [active, setActive] = useState(false)

    const toggle = () => key == false ? setKey(true) : setKey(false)

    const cancel = () => {
        key == false ? setKey(true) : setKey(false)
        setValue({ name: "", age: "", address: "" })
    }

    const search = e => {
        const user = document.querySelectorAll(".user");
        const name = document.querySelectorAll(".name");

        for (var i = 0; i < name.length; i++) {
            let match = user[i].querySelectorAll(".name")[0];
            if (match) {
                let textvalue = match.textContent || match.innerHTML

                if (textvalue.toLocaleUpperCase().indexOf(e.target.value.toLocaleUpperCase()) > -1) {
                    user[i].style.display = "";
                } else {
                    user[i].style.display = "none";
                }
            }
        }
    }

    const submit = () => {
        if (value?.id) {
            axios.put('http://localhost:8080/user/' + value.id, value).then(() => {
                console.log('uzgartirildi');
                setValue({ name: "", age: "", address: "" })
            })
        } else {
            axios.post('http://localhost:8080/user', value).then((res) => {
                console.log('saved');
                setValue({ name: "", age: "", address: "" })
            })
        }
        setName('Add New User')
        toggle()
    }

    const actives = () => active === false ? setActive(true) : setActive(false)

    return (
        <div>
            <Modal isOpen={key} style={{ borderRadius: '5px', boxShadow: '0 0 10px black' }}>
                <ModalHeader style={{ background: '#2e2e2e' }}>
                    <h1>{name}</h1>
                </ModalHeader>
                <ModalBody style={{ background: '#2e2e2e' }}>
                    <input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue(p => ({ ...p, name: e.target.value }))}
                        className="my-3 form-control"
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={value.age}
                        onChange={(e) => setValue(p => ({ ...p, age: e.target.value }))}
                        className="my-3 form-control"
                        placeholder="Age"
                    />
                    <input
                        type="text"
                        value={value.address}
                        onChange={(e) => setValue(p => ({ ...p, address: e.target.value }))}
                        className="my-3 form-control"
                        placeholder="Address"
                    />
                </ModalBody>
                <ModalFooter style={{ background: '#2e2e2e' }}>
                    <button className="btn my-3" onClick={cancel}>Cancel</button>
                    <button className="btn my-3" onClick={submit}>Submit</button>
                </ModalFooter>
            </Modal>

            <div className="block">
                <div className="header">
                    <input type="search" placeholder="Search" className="form-control" onKeyUp={(e) => search(e)} />
                    <div>
                        <button className="btn m-3" onClick={actives}>Active</button>
                        <button className="btn my-3" onClick={toggle}>+ Add User</button>
                    </div>
                </div>
                <User active={active} setValue={setValue} submit={submit} toggle={toggle} setName={setName} />
            </div>
        </div>
    )
}
export default App