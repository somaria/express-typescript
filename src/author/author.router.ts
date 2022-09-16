import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as AuthorService from './author.service'

export const authorRouter = express.Router()

authorRouter.get('/', async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors()
    res.status(200).json(authors)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

authorRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const author = await AuthorService.getAuthorById(parseInt(req.params.id))
    if (!author) {
      res.sendStatus(404)
    } else {
      res.status(200).json(author)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

authorRouter.post('/create', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body)
    const author = await AuthorService.createAuthor(req.body)
    res.status(201).json(author)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//update author
authorRouter.put('/update', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body)
    const author = await AuthorService.updateAuthor(req.body)
    res.status(201).json(author)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

//delete author
authorRouter.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const author = await AuthorService.deleteAuthor(parseInt(req.params.id))
    res.status(201).json(author)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
