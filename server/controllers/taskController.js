const User=require('../../database/model/user.model')
const Task=require('../../database/model/task.model')
const mongoose=require('mongoose')
const addTask=async (req,res)=>{
	const { task,description,priority,date,userId,name} = req.body;

	try {
		if (!task) return res.status(400).send('please enter the task');
		if (task.length < 10) res.status(400).send('add minimum 10 char');
		const taskDetail = await new Task({
			task,
            description,
            priority,
            date,
			createdBy: userId,
		});
		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('task addition failed');
	}
}
const getAllTasks = async (req, res) => {
	const { id,role} = req.query;
	console.log("we are inside getalltaskt server :",id)
	if(role==='admin'){
		let tasklist2 = await Task.find();
		console.log("we are inside getall tasks",tasklist2)
		return res.status(200).send(tasklist2)
	}
    
	try {
		let tasklist = await Task.find({ createdBy: id });
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};
const editTask = async (req, res) => {
	console.log("inside edit task")
	console.log(req.body.objectId)
	// const objectId =ObjectId(req.objectId);
	try{
		let task=await Task.findById({_id:req.body.objectId})
		console.log("task found",task)
		task.task=req.body.task
		task.description=req.body.description
		task.priority=req.body.priority
		task.date=req.body.data
		task.save()
		console.log("edited task successfullyy")
		return res.status(200).send(task);
	}catch(error){
		console.log(error)
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};
module.exports={
    addTask,
    getAllTasks,
    editTask,
    deleteTask
}