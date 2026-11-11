import { useQuery } from '@apollo/client'
import { ALL_TASKS } from '../graphql/queries'
import TaskItem from './TaskItem'

function TaskList() {
  const { data, loading, error } = useQuery(ALL_TASKS)

  if (loading) return <p>Загрузка задач...</p>
  if (error) return <p className="error">Не удалось загрузить задачи. Проверьте подключение к серверу.</p>

  const tasks = data?.allTasks || []

  return (
    <section>
      <h2>Список задач</h2>
      {tasks.length === 0 ? (
        <p>Задач пока нет.</p>
      ) : (
        <ul className="tasks">
          {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
        </ul>
      )}
    </section>
  )
}

export default TaskList
