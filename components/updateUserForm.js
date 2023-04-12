import { useEffect, useReducer, useState } from "react"
import { BiBrush } from 'react-icons/bi'
import Success from "./success"
import Bug from "./bug"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getUsers, getUser, updateUser } from "../lib/helper"

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function UpdateUserForm({ formId, formData, setFormData }){
    const queryClient = useQueryClient();
    const [success, setSuccess] = useState(false);
    const [dataObj, setDataObj] = useState({firstname: '', lastname: '', email: '', misId: '', attendance: '', cgpa: ''});
    const {isLoading, isError, data, error, isSuccess, isFetched, } =  useQuery(['users', formId], () => getUser(formId), {
        onSuccess: (data) => {
          // console.log(data);
          const [firstname, lastname] = data?.name?.split(' ') || formData;
          setDataObj({
            firstname: firstname,
            lastname: lastname,
            email: data?.email,
            misId: data?.misId,
            attendance: data?.attendance,
            cgpa: data?.cgpa,
          });
        }
      })
      const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess : async (data) => {
            // queryClient.setQueryData('users', (old) => [data])
            console.log('data updated')
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? dataObj?.firstname} ${formData.lastname ?? dataObj?.lastname}`;
        let updated = Object.assign({}, dataObj, formData, { name: userName});
        console.log(updated);
        await UpdateMutation.mutate(updated)
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error occured: {error}</div> 

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={dataObj?.firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={dataObj?.lastname} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={dataObj?.email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={dataObj?.misId} name="misId" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="MIS ID" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={dataObj?.attendance} name="attendance" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Attendance" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={dataObj?.cgpa} name="cgpa" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="CGPA" />
            </div>

            <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
             Update <span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>

        </form>
    )
}