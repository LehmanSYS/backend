const express = require('express');
const router1 = express.Router();
const Campus = require('../Database/Models/Campuses');
const Student = require('../Database/Models/Students');

//GET localhost:3000/api/students
router1.get('/', (req,res) =>{
	Student.findAll({ include: [Campus] }) //Eager Loading
	.then(students => res.status(200).json(students))
	.catch(err => console.log(err))
})

//GET localhost:3000/api/students/1
router1.get('/:id', async (req,res) =>{
	await Student.findByPk(req.params.id)
	.then(student=> {
		if(student != null)
		{
			res.status(200).send(student);
		}
		else
		{
			res.status(404).send();
		}
	})
})

//POST localhost:3000/api/students
router1.post('/', async (req,res)=>{
	let data = req.body;
	let builtStudent =await Student.create({
		name: data.name,
        img: data.img,
        gpa: data.gpa
	});
	await builtStudent.setCampus(data.campus);
	console.log('User added');

	Student.findAll({ include: [Campus] }) //Eager Loading
	.then(students => res.status(201).json(students))
})

//PUT localhost:3000/api/students/1
router1.put('/:id', async(req,res)=>{
	await Student.findByPk(req.params.id)
	.then(async student=> {
		if(student != null)
		{
			let data = req.body;
			let cam;
			if(data.campus != null){
				cam = await Campus.findByPk(data.campus);
			}
			else
			{
				cam = {};
			}
			await Student.update(	//information to update it with
				{
					name: data.name,
					img: data.img,
					gpa: data.gpa,
					campusId: data.campus,
					campus: cam
				},
				{where: { id: req.params.id}}	 	//location in the database to update
			)
				
			console.log("entry has been upddated");
			await Student.findAll({ include: [Campus] })
			.then(students => res.status(201).json(students))
			.catch(err => console.log(err))
		}
		else
		{
			let data = req.body;
			let builtStudent = await Student.create({
				name: data.name,
				img: data.img,
				gpa: data.gpa 
			});
			await builtStudent.setCampus(data.campus);
			console.log('User added');

			Student.findAll({ include: [Campus] }) //Eager Loading
			.then(students => res.status(201).json(students))
		}
	})
})

//DELETE localhost:3000/api/students/1
router1.delete('/:id', async (req,res)=>{
	await Student.findByPk(req.params.id)
	.then(async student=> {
		if(student != null)
		{
			await Student.destroy({ where: {id : req.params.id}});
			console.log("entry DESTORYED");

			await Student.findAll({ include: [Campus] })
			.then(students => res.status(201).json(students))
			.catch(err => console.log(err))
		}
		else
		{
			res.status(404).send();
		}
	})
	
})

module.exports = router1;