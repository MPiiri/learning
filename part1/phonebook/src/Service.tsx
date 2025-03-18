import axios from "axios"

export const getPersons = () => (axios
    .get('http://localhost:3001/persons'))
export const postPerson = (url: string, data: { name: string, number: number, id: any }) =>
    axios
        .post(url, data)

export const delPerson = (id: any) => axios
    .delete(`http://localhost:3001/persons/${id}`)

export const updatePerson = (id: any, data: any) => axios
    .put(`http://localhost:3001/persons/${id}`, data)