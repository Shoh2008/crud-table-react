import React, { useEffect, useRef, useState } from "react";
import './style.css'
import axios from "axios";

const User = ({ active, setValue, submit, toggle, setName }) => {

    const [user, setUser] = useState([]);

    const deleteUser = id => {
        axios.delete("http://localhost:8080/user/" + id).then(() => console.log('aaa'))
        get()
    }

    const get = () => {
        axios.get("http://localhost:8080/user").then((res) => {
            setUser(res.data)
        })
    }

    const put = (event, id) => {
        user.map((item, index) => {
            if (item.id == id) {
                axios.put('http://localhost:8080/user/' + id,
                    {
                        ...user[id],
                        id: item.id,
                        name: item.name,
                        age: item.age,
                        address: item.address,
                        check: event.target.checked
                    })
                    .then(() => {
                        setValue({ name: "", age: "", address: "" })
                    })
            }
        })
    }

    const edit = item => {
        setValue(item)
        setName('Edit User')
        toggle()
    }

    useEffect(() => {
        get()
    }, [submit])

    return (
        <div className="bodyTable">
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((item, index) => {
                            if (active == false) {
                                return <tr key={index} className="user">
                                    <td>{index + 1}</td>
                                    <td className="name">{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <input type="checkbox" checked={item.check} onChange={(e) => put(e, item.id)} />
                                    </td>
                                    <td>
                                        <button onClick={() => edit(item)} className='btn mx-2'>✍</button>
                                        <button onClick={() => deleteUser(item.id)} className='btn mx-2'>🗑</button>
                                    </td>
                                </tr>
                            } else if (active == true && item.check == true) {
                                return <tr key={index} className="user">
                                    <td>{index + 1}</td>
                                    <td className="name">{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <input type="checkbox" checked={item.check} onChange={(e) => put(e, item.id)} />
                                    </td>
                                    <td>
                                        <button onClick={() => edit(item)} className='btn mx-2'>✍</button>
                                        <button onClick={() => deleteUser(item.id)} className='btn mx-2'>🗑</button>
                                    </td>
                                </tr>
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default User