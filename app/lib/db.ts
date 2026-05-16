// lib/db.ts

type Post = {
  id: number
  name: string
  age: number
}

export const posts: Post[] = [
  { id: 1, name: 'Amit', age: 20 },
  { id: 2, name: 'Sumit', age: 20 },
]