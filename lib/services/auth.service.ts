import { compare, hash } from "bcrypt";
import { nanoid } from "nanoid";
import { users } from "@/db/schema";
import { db } from "@/lib/db"

export async function hashPassword(password: string) {
  return hash(password, 10)
}

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

// Create a new user
export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password)
  const id = nanoid()

  console.log("hashedPassword", hashedPassword)
  console.log("id", id)


  try {
    console.log('START')
    await db.insert(users).values({
      id,
      email,
      password: hashedPassword,
    })
    console.log('FINISHED', {
      id, email
    })

    return { id, email }
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}
