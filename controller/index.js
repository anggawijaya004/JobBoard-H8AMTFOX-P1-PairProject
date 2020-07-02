const { Job, Tag, User, JobTag } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const email = require('../helper/email')

class Controller {

    static addJobForm(req, res) {
        Tag.findAll()
            .then(data => {
                res.render('addJob', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addJob(req, res) {
        const user = req.session
        const data = req.body
        const addedJob = {
            title: data.title,
            description: data.descriptions,
            budget: data.budget,
            user_id: user.userid
        }
        const tagId = data.tag
        console.log(user)
        console.log(addedJob)
        Job.create(addedJob)
            .then(jobData => {
                let jobTagData = []
                for (let i = 0; i < tagId.length; i++) {
                    let obj = {
                        job_id: `${jobData.id}`, tag_id: `${tagId[i]}`
                    }
                    jobTagData.push(obj)
                }
                JobTag.bulkCreate(jobTagData)
                    .then(() => {
                        res.redirect('/jobs/')
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static jobList(req, res) {
        const user = req.session
        Job.findAll({
            include: [
                { model: Tag }
            ]
        })
            .then(data => {


                res.render('jobList.ejs', { data, user })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static editJobForm(req, res) {
        const id = req.params.id
        let jobData = null
        Job.findAll({
            where: { id: id }
        })
       
            .then(data => {
                jobData = data[0].dataValues
                
                return Tag.findAll()
            })
            .then(tagData => {
                console.log(jobData)
                res.render('editJob.ejs', { jobData })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteJob(req, res) {
        const id = req.params.id
        Job.destroy({ where: { id: id } })
            .then(() => {
                res.redirect('/jobs')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static jobSearch(req, res) {
        const user = req.session
        const { keyword } = req.query;
        console.log(keyword)
        Job.findAll({
            include: [
                { model: Tag }
            ],
            where: { title: { [Op.like]: '%' + keyword + '%' } }
        })
            .then(data => {
                console.log(data)
                res.render('jobList.ejs', { data, user })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postedJobs(req, res) {
        const user = req.session
        const id = req.session.userid
        if (!req.params.username) {
            res.send(`harap login terleih dahulu!`)
        }
        Job.findAll({
            include: [
                { model: Tag }
            ], where: { user_id: id }
        })
            .then(data => {
                res.render('userPostedJobs.ejs', { data, user })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static join(req, res){
        let emailId = req.params.id
        let emailTo = ''
        User.findAll()
            .then(data =>{
                for (let i=0; i<data.length; i++){
                    if (data[i].id == emailId){
                        emailTo = data[i].email 
                    }
                }
                email(emailTo)
                res.redirect('/jobs/succes')
            })
            .catch(err =>{
                console.log(err)
            })

    }

    static email(req, res){
        res.render('succesJoin')
    }


}

module.exports = Controller