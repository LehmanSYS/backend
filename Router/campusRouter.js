const express = require('express');
const router = express.Router();
const Campus = require('../Database/Models/Campuses');
const Student = require('../Database/Models/Students');

//GET localhost:3000/api/campuses
router.get('/', (req,res) =>{
	Campus.findAll({ include: [Student] }) //Eager Loading
	.then(campuses => res.status(200).json(campuses))
	.catch(err => console.log(err))
})

//GET localhost:3000/api/campuses/1 
router.get('/:id', async(req,res) =>{
	await Campus.findByPk(req.params.id)
	.then(campus =>{
		if(campus !== null)
		{
			res.status(200).send(campus);
		}
		else
		{
			res.status(404).send();
		}
	})
})


//POST localhost:3000/api/campuses
router.post('/', async (req,res)=>{
	let data = req.body;
	await Campus.create({
		name: data.name,
		bio: data.bio,
		address: data.address,
		img: data.img
	});
	console.log('User added');

	Campus.findAll({ include: [Student] }) //Eager Loading
	.then(campuses => res.status(201).json(campuses))
})

//PUT localhost:3000/api/campuses/1
router.put('/:id', async (req,res)=>{
	await Campus.findByPk(req.params.id)
	.then(async campus =>{
		if(campus != null)
		{
			let data = req.body;
			await Campus.update(	//information to update it with
			{
				name: data.name,
				bio: data.bio,
				address: data.address,
				img: data.img
			},
			{where: { id: req.params.id}}		//location in the database to update
			)
		
			console.log("entry has been updated");
			await Campus.findAll({ include: [Student] })
			.then(campuses => res.status(201).json(campuses))
			.catch(err => console.log(err))
		}
		else{
			let data = req.body;
			await Campus.create({
				name: data.name,
				bio: data.bio,
				address: data.address,
				img: data.img
			});
			console.log('User added');

			Campus.findAll({ include: [Student] }) //Eager Loading
			.then(campuses => res.status(201).json(campuses))
		}
	
	})
})

//DELETE localhost:3000/api/campuses/1
router.delete('/:id', async(req,res)=>{
	await Campus.findByPk(req.params.id)
	.then(async campus => {
		if(campus != null)
		{
			await Campus.destroy({ where: {id : req.params.id}});
			console.log("entry DESTORYED");

			await Campus.findAll({ include: [Student] })
			.then(campuses => res.status(201).json(campuses))
			.catch(err => console.log(err))
		}
		else{
			res.status(404).send();
		}
	})
	
})

module.exports = router;