import React from 'react'
import { useParams } from 'react-router-dom';
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {editTask} from '../redux/taskSlice'
import {useDispatch} from 'react-redux'
const EditTask = () => {
    const dispatch=useDispatch()
    const {auth}=useSelector((state)=>({...state}))
    const {currentUser}=auth;
    const { id } = useParams();
    console.log(id)
    const tasks=useSelector((state)=>state.task)
    const {AllTasks}=tasks
    const itemToDisplay = Object.values(AllTasks).find((item) => item._id === id);
    const [state,setState]=useState({
        task:itemToDisplay.task,
        description:itemToDisplay.description,
        priority:itemToDisplay.priority,
        date:new Date(),
      })
    const handleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value); // Parse the date string to a Date object
        setState({
          ...state,
          date: selectedDate, // Update the "date" field in the state with a Date object
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(
            editTask({
                task:state.task,
                description:state.description,
                priority:state.priority,
                date:state.date,
                userId: currentUser.id,
                objectId:itemToDisplay._id,
            })
        )
    }
    console.log(state.task,state.description,state.date,state.priority)
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-2 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Edit Task 
      </h2>
    </div>

    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="border border-gray-300 p-6 rounded-lg shadow-lg space-y-6 " action="#" onSubmit={handleSubmit} method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Heading
          </label>
          <div className="mt-2">
            <input
              id="Heading"
              name="task"
              type="text"
              onChange={handleChange}
              value={state.task}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
          </div>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              value={state.description}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between">
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="date">
          <span className="label-text">Due Date</span>
        </label>

        <div className="relative">
        <input
          id="date"
          className="block w-full input input-bordered"
          name="date"
          type="date"
          onChange={handleDateChange}
          value={state.date.toISOString().split('T')[0]} 
        />
        </div>
      </div>
      <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Status</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Set Status of the work</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="priority"
                    type="radio"
                    value="To-Do"
                    checked={state.priority === 'To-Do'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    To-Do
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="priority"
                    value="Done"
                    checked={state.priority=== 'Done'}
                    onChange={handleChange}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Done
                  </label>
                </div>
              </div>
            </fieldset>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  </div>
  )
}

export default EditTask
