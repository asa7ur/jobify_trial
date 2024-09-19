import { Router } from 'express'
const router = Router()

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js'

// router.get('/', getAllJobs)
// router.get('/:id', getJob)

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router
