import express from 'express'
import {
  getArticlesHandler,
  postArticleHandler,
  putArticleHandler,
  deleteArticleHandler,
  getArticleDetailHandler,
  replaceArticleHandler
} from '../controllers/articles.mjs'
import authMiddleware from '../middlewares/authenticate.mjs'

const articlesRouter = express.Router()

articlesRouter.get('/', authMiddleware, getArticlesHandler)
articlesRouter.post('/', authMiddleware, postArticleHandler)
articlesRouter.delete('/', authMiddleware, deleteArticleHandler)
articlesRouter.put('/', authMiddleware, putArticleHandler)

articlesRouter.get('/:articleId', authMiddleware, getArticleDetailHandler)
articlesRouter.put('/:articleId', authMiddleware, putArticleHandler)
articlesRouter.put('/:articleId/replace', authMiddleware, replaceArticleHandler)

export default articlesRouter
