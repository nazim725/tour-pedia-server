import mongoose from 'mongoose'
const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String], //tags Ta array hbe se jonno ai rokm
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
})

const tourModel = mongoose.model('Tour', tourSchema)
export default tourModel
