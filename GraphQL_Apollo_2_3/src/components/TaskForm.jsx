import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_TASKS } from '../graphql/queries'
import { CREATE_TASK } from '../graphql/mutations'

function TaskForm() {
  const [title, setTitle] = useState('')
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: ALL_TASKS }],
    awaitRefetchQueries: true
  })

  async function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) return

    try {
      await createTask({ variables: { title: title.trim() } })
      setTitle('')
    } catch {
      return
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Название задачи"
          aria-label="Название задачи"
        />
        <button type="submit" disabled={loading || !title.trim()}>
          {loading ? 'Добавление...' : 'Добавить'}
        </button>
      </form>
      {error && <p className="error">Не удалось добавить задачу.</p>}
    </section>
  )
}

export default TaskForm
