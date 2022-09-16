import { db } from '../utils/db.server'

export type Author = {
  id: number
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}

export const listAuthors = async (): Promise<Author[]> => {
  return await db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const getAuthorById = async (id: number): Promise<Author | null> => {
  return await db.author.findUnique({
    where: { id },
    include: {
      books: true,
    },
  })
}

export const createAuthor = async (
  author: Omit<Author, 'id'>
): Promise<Author> => {
  return await db.author.create({
    data: author,
  })
}

//update author
export const updateAuthor = async (author: Author): Promise<Author> => {
  return await db.author.update({
    where: { id: author.id },
    data: author,
  })
}

//delete author
export const deleteAuthor = async (id: number): Promise<Author> => {
  return await db.author.delete({
    where: { id },
  })
}
