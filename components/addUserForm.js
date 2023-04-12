import { useReducer, useState } from "react";
import { BiPlus } from 'react-icons/bi'
import Success from "./success"
import Bug from "./bug"
import { useQueryClient, useMutation } from "react-query"
import { addUser, getUsers } from "../lib/helper"

export default function AddUserForm({ formData, setFormData}){
    const queryClient = useQueryClient()
    const addMutation = useMutation(addUser, {
        onSuccess : () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(formData).length == 0) console.log("err");
        let { firstname, lastname, email, misId, attendance, cgpa } = formData;

        const model = {
            name : `${firstname} ${lastname}`,
            email, misId, attendance, cgpa
        }

        addMutation.mutate(model)
        console.log(formData)
    }

    if(addMutation.isLoading) return <div>Loading!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="misId" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="MIS ID" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="attendance" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Attendance" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="cgpa" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="CGPA" />
            </div>

            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add <span className="px-1"><BiPlus size={24}></BiPlus></span></button>

        </form>
    )
}