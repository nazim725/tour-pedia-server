import express from 'express'
import mongoose from 'mongoose'
import tourModel from '../models/tour.js'

// tour db te save korar jonno
export const createTour = async (req, res) => {
  const tour = req.body
  const newTour = new tourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toDateString(),
  })
  try {
    await newTour.save()
    res.status(201).json(newTour)
  } catch (error) {
    res.status(404).json({ message: 'Someting wen wrong' })
  }
}

// tour db theke anar jonno
export const getTours = async (req, res) => {
  const { page } = req.query //frontend theke page ta sbe jeta req.query er modde pawa jabe

  try {
    // const tours = await tourModel.find()
    // res.status(200).json(tours)

    const limit = 6 //per page e 6 ta tour thakbe
    const startIndex = (Number(page) - 1) * limit //starting index hbe
    const total = await tourModel.countDocuments({}) //db te koita data ache setar total count return kore
    const tours = await tourModel.find().limit(limit).skip(startIndex) //per page e 6 ta tour thakbe
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
// tour db theke single data (tour) anar jonno
export const getTour = async (req, res) => {
  const { id } = req.params
  try {
    const tour = await tourModel.findById(id)
    res.status(200).json(tour)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

// db theke onlu loggedin user er create create kora tour ghula dashboard a anar jonn
export const getToursByUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" })
  }
  const userTours = await tourModel.find({ creator: id })
  res.status(200).json(userTours)
}

//  db theke single tour delete korar jonno
export const deleteTour = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Tour Exist with is: ${id}` })
    }
    await tourModel.findByIdAndRemove(id)
    res.json({ message: 'Tour deleted successfully' })
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

// db theke single tour update korar jonno
export const updateTour = async (req, res) => {
  const { id } = req.params
  const { title, description, creator, imageFile, tags } = req.body
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` })
    }

    const updatedTour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    }
    await tourModel.findByIdAndUpdate(id, updatedTour, { new: true })
    res.json(updatedTour)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query
  try {
    const title = new RegExp(searchQuery, 'i')
    const tours = await tourModel.find({ title })
    res.json(tours)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
export const getToursByTags = async (req, res) => {
  const { tag } = req.params
  try {
    const tours = await tourModel.find({ tags: { $in: tag } })
    res.json(tours)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
export const getRelatedTours = async (req, res) => {
  const tags = req.body
  try {
    const tours = await tourModel.find({ tags: { $in: tags } })
    res.json(tours)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

// export const likeTour = async (req, res) => {
//   const { id } = req.params
//   try {
//     // jodi user id the na thake taile sei usewr authenticated na
//     if (!req.userId) {
//       return res.json({ message: 'User is not authenticated' })
//     }
//     // id valid kina check kore
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ message: `No tour exist with id: ${id}` })
//     }
//     const tour = await tourModel.findById(id)
//     const index = tour.likes.findIndex((id) => id === String(req.userId)) //likes array te userId store kora

//     //same user kina check kore.
//     if (index === -1) {
//       // jodi same user na hoi taile likes array te userId store korbe
//       tour.likes.push(req.userId)
//     } else {
//       //  jodi same user e abar like button click kore taile like akta kombe
//       tour.likes = tour.likes.filter((id) => id !== String(req.userId))
//     }

//     const updatedTour = await tourModel.findByIdAndUpdate(id, tour, {
//       new: true,
//     })
//     res.status(200).json(updatedTour)
//   } catch (error) {
//     res.status(404).json({ message: error.message }) //mongodb error dibe
//   }
// }
export const likeTour = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.userId) {
      return res.json({ message: 'User is not authenticated' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` })
    }

    const tour = await tourModel.findById(id)

    const index = tour.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
      tour.likes.push(req.userId)
    } else {
      tour.likes = tour.likes.filter((id) => id !== String(req.userId))
    }

    const updatedTour = await tourModel.findByIdAndUpdate(id, tour, {
      new: true,
    })

    res.status(200).json(updatedTour)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
