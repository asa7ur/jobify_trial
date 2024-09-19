import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobStatus: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'internship',
    },
    jobLocation: {
      type: String,
      default: 'Earth',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Job', JobSchema)
