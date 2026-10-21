export interface Book {
  id: string
  title: string
  author: string
  category: string
  notes: string
  isRead: boolean
  addedAt: string
}

export type NewBook = Pick<Book, 'title' | 'author' | 'category' | 'notes'>

export class BookItem implements Book {
  readonly id: string
  readonly title: string
  readonly author: string
  readonly category: string
  readonly notes: string
  readonly addedAt: string
  isRead: boolean

  constructor(data: NewBook & Partial<Pick<Book, 'id' | 'isRead' | 'addedAt'>>) {
    this.id = data.id ?? crypto.randomUUID()
    this.title = data.title.trim()
    this.author = data.author.trim()
    this.category = data.category.trim()
    this.notes = data.notes.trim()
    this.isRead = data.isRead ?? false
    this.addedAt = data.addedAt ?? new Date().toISOString()
  }

  get displayTitle(): string {
    return this.title
  }

  toggleRead(): void {
    this.isRead = !this.isRead
  }

  serialize(): Book {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      category: this.category,
      notes: this.notes,
      isRead: this.isRead,
      addedAt: this.addedAt,
    }
  }

  static fromJSON(data: Book): BookItem {
    return new BookItem(data)
  }
}

export function isBookRecord(value: unknown): value is Book {
  if (typeof value !== 'object' || value === null) return false

  const book = value as Partial<Book>
  return (
    typeof book.id === 'string' &&
    typeof book.title === 'string' &&
    typeof book.author === 'string' &&
    typeof book.category === 'string' &&
    typeof book.notes === 'string' &&
    typeof book.isRead === 'boolean' &&
    typeof book.addedAt === 'string'
  )
}