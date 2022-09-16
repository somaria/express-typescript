import { db } from '../utils/db.server'

import type { Author } from '../author/author.service'

type BookRead = {
  id: number
  title: string
  isFiction: boolean
  publishedDate: Date | null
  author: Author | null
  createdAt: Date
  updatedAt: Date
}

type BookCreate = {
  title: string
  isFiction: boolean
  publishedDate: Date | null
  authorId: number | null
}

export const listBooks = async (): Promise<BookRead[]> => {
  return await db.book.findMany({
    select: {
      id: true,
      title: true,
      isFiction: true,
      publishedDate: true,
      author: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

//get book by book id
export const getBookById = async (id: number): Promise<BookRead | null> => {
  return await db.book.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      isFiction: true,
      publishedDate: true,
      author: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

//get book by author id
export const getBookByAuthorId = async (id: number): Promise<BookRead[]> => {
  return await db.book.findMany({
    where: { authorId: id },
    select: {
      id: true,
      title: true,
      isFiction: true,
      author: true,
      publishedDate: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const createBook = async (book: BookCreate): Promise<BookRead> => {
  return await db.book.create({
    data: {
      title: book.title,
      isFiction: book.isFiction,
      publishedDate: new Date(),
      authorId: book.authorId,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      author: true,
      publishedDate: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

//update book
export const updateBook = async (book: BookRead): Promise<BookRead> => {
  return await db.book.update({
    where: { id: book.id },
    data: {
      title: book.title,
      isFiction: book.isFiction,
      publishedDate: book.publishedDate,
      authorId: book.author?.id,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      author: true,
      publishedDate: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

//delete book
export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: { id },
  })
}
