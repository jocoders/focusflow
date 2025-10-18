import { redirect } from 'next/navigation'
import TaskForm from './TaskForm'
import { getCurrentUser } from '@/lib/repositories/users.repo'

const NewTask = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }

  return <TaskForm userId={user.id} />
}

export default NewTask
