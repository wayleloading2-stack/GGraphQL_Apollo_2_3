import { useMutation } from '@apollo/client'
import { ALL_TASKS } from '../graphql/queries'
import { COMPLETE_TASK } from '../graphql/mutations'

function TaskItem({ task }) {
  const [completeTask, { loading, error }] = useMutation(COMPLETE_TASK, {
    refetchQueries: [{ query: ALL_TASKS }],
    awaitRefetchQueries: true
  })

  async function handleComplete() {
    try {
      await completeTask({ variables: { id: Number(task.id) } })
    } catch {
      return
    }
  }

  return (
    <li className="task">
      <div>
        <div className={task.isCompleted ? 'completed' : ''}>{task.title}</div>
        <small>Категория: {task.category.name}</small>
      </div>
      {task.isCompleted ? (
        <span className="done">Выполнено</span>
      ) : (
        <button type="button" onClick={handleComplete} disabled={loading}>
          {loading ? 'Сохранение...' : 'Выполнить'}
        </button>
      )}
      {error && <p className="error">Не удалось изменить задачу.</p>}
    </li>
  )
}

export default TaskItem
