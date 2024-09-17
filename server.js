import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan'
import { nanoid } from 'nanoid'

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
]

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/', (req, res) => {
  console.log(req)
  res.json({ message: 'data received', data: req.body })
})

// get all jobs
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs })
})

// create a job
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body //req.body is where the JSON data is stored
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' })
  }
  const id = nanoid(10) // an id of 10 characters
  const job = { id, company, position }
  jobs.push(job)
  res.status(201).json({ job })
})

// get single job
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params // refers to the route parameters that are part of the URL
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ job })
})

// edit job
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' })
  }
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  job.company = company
  job.position = position

  res.status(200).json({ msg: 'job modified', job })
})

// delete job
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  const newJobs = jobs.filter((job) => job.id !== id)
  jobs = newJobs

  res.status(200).json({ msg: 'job deleted' })
})

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({msg: 'something went wrong'})
})

const port = process.env.PORT || 5100

app.listen(5100, () => {
  console.log(`server running on PORT ${port}`)
})
