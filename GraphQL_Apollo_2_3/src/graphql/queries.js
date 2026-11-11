import { gql } from '@apollo/client'

export const ALL_TASKS = gql`
  query AllTasks {
    allTasks {
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
