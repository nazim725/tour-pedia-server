import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()

import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  getToursBySearch,
  getToursByTags,
  getToursByUser,
  updateTour,
  getRelatedTours,
  likeTour,
} from '../controllers/tour.js'
router.post('/', auth, createTour) //1st e auth er kaj korbe then createTour er kaj koprbe
router.get('/', getTours) // db theke all tour anar jonno
router.get('/:id', getTour) //db theke single tour anar jonno
router.delete('/:id', auth, deleteTour) //db theke single data delete korar jonno
router.patch('/:id', auth, updateTour) //db theke single tour update korar jonno
router.get('/userTours/:id', auth, getToursByUser) // db theke logged in user er create kora tour ghula anar jonno
router.get('/search', getToursBySearch) // search kore nia asbe
router.get('/tag/:tag', getToursByTags) // search tag er shate mill ache sei rokm sob tiur nia asbe
router.post('/relatedTours', getRelatedTours) // related tours ghula nia sbe tags er opor depend kore
router.patch('/like/:id', auth, likeTour) //like er sonka update korbe
export default router
