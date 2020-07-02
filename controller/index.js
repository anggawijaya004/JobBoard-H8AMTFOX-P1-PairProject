const { Job, Tag, User, JobTag } = require('../models')

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
        const data = req.body
        const addedJob = {
            title: data.title,
            description: data.descriptions,
            budget: data.budget
        }
        const tagId = data.tag

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
                res.send(err)
            })
    }

    static jobList(req,res) {
        Job.findAll({
            include: [
                {model: Tag }
            ]
        })
        .then( data => {
           
            console.log(data[0].dataValues.Tags[0].dataValues.name)
            res.render('jobList.ejs', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteJob(req,res) {
        const id = req.params.id
        Job.destroy( { where: { id: id } })
        .then(() => {
            res.redirect('/jobs')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller