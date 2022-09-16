import express from 'express'
import * as BookService from './book.service'
import type { Request, Response } from 'express'

export const bookRouter = express.Router()

bookRouter.get('/', async (req: Request, res: Response) => {
  try {
    const books = await BookService.listBooks()
    res.status(200).json(books)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//get book by id
bookRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await BookService.getBookById(parseInt(req.params.id))
    if (!book) {
      res.sendStatus(404)
    } else {
      res.status(200).json(book)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//get book by author id
bookRouter.get('/author/:id', async (req: Request, res: Response) => {
  try {
    const books = await BookService.getBookByAuthorId(parseInt(req.params.id))
    res.status(200).json(books)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//create book
bookRouter.post('/create', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body)
    const book = await BookService.createBook(req.body)
    res.status(201).json(book)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//update book
bookRouter.put('/update', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body)
    const book = await BookService.updateBook(req.body)
    res.status(201).json(book)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//delete book
bookRouter.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const book = await BookService.deleteBook(parseInt(req.params.id))
    res.status(201).json(book)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
