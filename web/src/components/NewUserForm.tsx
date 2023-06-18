'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'

export function NewUserForm() {
  const router = useRouter()

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    const response = await api.post('/register', { username, password })

    if (response.status === 200) {
      router.refresh()
    }
  }

  return (
    <form
      onSubmit={handleCreateUser}
      className="flex w-[480px] flex-col items-center justify-center gap-4"
    >
      <label className="flex w-full flex-row gap-2">
        Username:
        <input
          type="text"
          name="username"
          className="w-full rounded-md border-2 border-blue-200 bg-slate-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex w-full flex-row gap-2">
        Password:
        <input
          type="password"
          name="password"
          className="w-full rounded-md border-2 border-blue-200 bg-slate-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-green-500 p-3 hover:bg-green-700 active:bg-green-900"
      >
        Create user
      </button>
    </form>
  )
}
