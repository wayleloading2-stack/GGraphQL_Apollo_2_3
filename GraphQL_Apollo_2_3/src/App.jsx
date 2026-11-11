import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <main className="container">
      <h1>Менеджер задач</h1>
      <TaskForm />
      <TaskList />
    </main>
  )
}

export default App
