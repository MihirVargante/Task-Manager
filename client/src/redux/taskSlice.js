import { createSlice } from '@reduxjs/toolkit';
import history from '../history'
import axios from 'axios'
import { toast } from 'react-toastify';
const initalTask = localStorage.getItem('task')
	? JSON.parse(localStorage.getItem('task'))
	: null;

const initialState = {
        TaskData: initalTask,
        AllTasks: {},
    };
export const taskSlice=createSlice({
	name: 'Task',
	initialState,

	reducers: {
		taskAddedSuccessfully: (state, action) => {
			state.TaskData = action.payload;
		},
		taskAddFailure: (state) => {
			return state;
		},
		getAllTaskSuccess: (state, action) => {
			state.AllTasks = action.payload;
		},
		getAllTaskFailure: (state) => {
			return state;
		},

		editTaskSuccess: (state, action) => {
			state.TaskData = action.payload;
		},

		deleteSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deletefail: (state) => {
			return state;
		},
	},
})

export const {
	taskAddFailure,
	taskAddedSuccessfully,
	getAllTaskFailure,
	getAllTaskSuccess,
	deleteSuccess,
	deletefail,
	editTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask=({task,description,priority,date,userId})=>async (dispatch)=>{
    console.log("we are inside task")
    console.log(task)
    console.log(description)
    

    const taskData={
        task,
        description,
        priority,
        date,
        userId,
    };

    const response=await axios.post("http://localhost:4000/task/add",taskData)
		console.log("we are inside response")
        localStorage.setItem('task',JSON.stringify(response.data))
        dispatch(taskAddedSuccessfully(response.data))
		history.push('/home')
        window.location.reload()
		toast.success('task added successfully');
    // }els
    //     dispatch(taskAddFailure())
    // }
}
export const getAllTasks=(token,id,role)=>async (dispatch)=>{
    console.log("we are inside get tasks client",id)
	
   
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			id,
			role,
		},
	};
	try {
		const response = await axios.get(
			'http://localhost:4000/task/tasks',
			config
		);

		if (response) {
			dispatch(getAllTaskSuccess(response.data));
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(getAllTaskFailure());
		}
	}
}
export const editTask=({task,description,priority,date,userId,objectId})=>async (dispatch)=>{
	console.log("here is task id",objectId)
	console.log("here is task id",task)
    const taskData={
		objectId,
        task,
        description,
        priority,
        date,
        userId,
    };

	try{
		let response = await axios.put(
			`http://localhost:4000/task/edit/${objectId}`,
			taskData
		);
		dispatch(editTaskSuccess(response.data))
			history.push('/home')
			window.location.reload()
		
	}catch(error){
		console.log(error)
	}
}

export const deleteItem = (id) => async (dispatch) => {
	console.log("we are inside delete taskslice")
	console.log(id);
	let res = await axios.delete(`http://localhost:4000/task/${id}`);

	if (res) {
		dispatch(deleteSuccess());
		toast.success('task deleted successfully');
		history.push('/home')
		window.location.reload();
	} else {
		dispatch(deletefail());
	}
};