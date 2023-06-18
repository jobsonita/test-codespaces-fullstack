import { api } from '@/lib/api'

import { NewUserForm } from '@/components/NewUserForm'

interface User {
  id: string
  username: string
}

export default async function Home() {
  const response = await api.get<User[]>('/users')

  const users = response.data

  return (
    <div className="mx-4 my-2 flex h-screen flex-col items-center justify-center gap-4">
      <h1>Last 10 users created:</h1>
      <ul className="flex w-[480px] flex-col items-center justify-center gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="w-[50%] rounded-md bg-zinc-600 p-1 text-center text-yellow-300"
          >
            {user.username.toLocaleUpperCase()}
          </li>
        ))}
      </ul>
      <h2>New user:</h2>
      <NewUserForm />
    </div>
  )
}
