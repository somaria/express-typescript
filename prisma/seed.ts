import { db } from '../src/utils/db.server'

type Author = {
  firstName: string
  lastName: string
}

type Book = {
  title: string
  isFiction: boolean
  publishedDate: Date
}

async function seed() {
  await db.author.deleteMany()
  await db.book.deleteMany()
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      })
    })
  )
  const author = await db.author.findFirst({
    where: {
      firstName: 'Yuval Noah',
    },
  })

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, publishedDate } = book
      return db.book.create({
        data: {
          title,
          isFiction,
          publishedDate,
          authorId: author.id,
        },
      })
    })
  )
}

seed()

function getAuthors(): Array<Author> {
  return [
    {
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      firstName: 'William',
      lastName: 'Shakespeare',
    },
    {
      firstName: 'Yuval Noah',
      lastName: 'Harari',
    },
  ]
}

function getBooks(): Array<Book> {
  return [
    {
      title: 'Sapiens',
      isFiction: false,
      publishedDate: new Date(),
    },
    {
      title: 'Homo Deus',
      isFiction: false,
      publishedDate: new Date(),
    },
    {
      title: 'The Ugly Duckling',
      isFiction: true,
      publishedDate: new Date(),
    },
  ]
}
