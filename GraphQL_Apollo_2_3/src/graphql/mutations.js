import { gql } from '@apollo/client'

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      isCompleted
      category {
        id
        name
      }
    }
  }
`

export const COMPLETE_TASK = gql`
  mutation CompleteTask($id: Int!) {
    completeTask(id: $id) {
      id
      isCompleted
    }
  }
`
