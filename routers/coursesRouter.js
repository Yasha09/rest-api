const express = require('express');
const Joi = require('joi')
const bodyParser = require('body-parser')

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
]
const coursesRouter = express.Router();

coursesRouter.use(bodyParser.json())

coursesRouter.route('/')
  .get((req, res) => {
    res.send(courses)
  })
  .post((req, res) => {
    const {error} = validationCourse(req.body)
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const course = {
      id: courses.length + 1,
      name: req.body.name,
    }
    courses.push(course);
    res.send(course)
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /courses')
  })
  .delete((req, res) => {
    res.end('Deleting all the courses')
  });

coursesRouter.route('/:courseId')
  .get((req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.courseId));
    if (!course) res.status(404).send('The course whit the give ID was not found');
    res.send(course)
  })
  .put((req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.courseId));
    if (!course) res.status(404).send('The course whit the give ID was not found');

    const {error} = validationCourse(req.body)
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    course.name = req.body.name;
    res.send(course)
  })
  .delete((req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.courseId));
    if (!course) res.status(404).send('The course whit the give ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
  })

function validationCourse(course) {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(10).required()
  })
  return schema.validate(course)
}

module.exports = coursesRouter