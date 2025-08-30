import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Form = () => {
    const [data, setData] = useState({ username: "", mobile: "" })
    const [tableData, setTableDta] = useState([])
    const [editData, setEditData] = useState("")
    console.log(tableData, 'tableData')
    const handleData = async () => {
        let response;
        const bodyData = {
            username: data.username,
            phonenumber: data.mobile
        }
        let val = []
        try {
            response = await axios.post('http://localhost:8000/api/create', bodyData, {

                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            val.push(response.data)
            if (editData !== "") {
                // setData({ ...data, username: data.username, mobile: data.mobile })
                tableData.find((x, i) => {
                    if (x.data._id === editData) {
                        x.data.username = data.username
                        x.data.phonenumber = data.mobile
                        setEditData("")
                        return x
                    }
                })
            } else {
                setTableDta([...tableData, ...val])
            }

            setData({ username: "", mobile: "" })
            if (response.success) {

                setData({ username: "", mobile: "" })
            }

            console.log(response, 'datasss')
        } catch (error) {
            console.log(error, 'error')
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })


    }

    useEffect(() => {
        const fetchData = async () => {
            let response;
            try {
                response = await axios.get('http://localhost:8000/api/getAll')
                if (response && response.data) {

                }
            } catch (error) {
                console.log(error, 'error')
            }
        }
        fetchData()
    }, [])

    const handleEdit = async (data) => {
        setEditData(data._id)
        setData({ username: data.username, mobile: data.phonenumber })
        console.log(data, 'findData')
    }
    const handleDelete = async (id) => {

        const filterData = tableData.filter((x, i) => x.data._id !== id)

        setTableDta(filterData)
    }
    return (
        <div>
            <div style={{ margin: "20px" }}>Form

            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "20px" }}>
                <div>UserName : <input name={"username"} value={data.username} onChange={(e) => handleChange(e)} /></div>
                <div>Mobile Number : <input name={"mobile"} value={data.mobile} onChange={(e) => handleChange(e)} /></div>
                <div><button onClick={() => handleData()}>submit</button></div>
            </div>
            <div style={{ padding: "20px" }}>List of Employees</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <table border={1}>
                    <tr>
                        <th>S.NO</th>
                        <th>User Name</th>
                        <th>Mobile Number</th>
                        <th>Action</th>
                    </tr>
                    {tableData && tableData.length > 0 && tableData.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.data.username}</td>
                            <td>{item.data.phonenumber}</td>
                            <td><button onClick={() => handleEdit(item.data)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(item.data._id)}>Delete</button></td>

                        </tr>
                    ))}

                </table>
            </div>

        </div>
    )
}

export default Form