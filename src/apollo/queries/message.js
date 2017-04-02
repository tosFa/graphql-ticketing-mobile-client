import gql from 'graphql-tag'

export const list = gql`query Messages($lastItem: ID, $limit: Int!, $issueUuid: ID){
  messages(lastItem: $lastItem, limit: $limit, issueUuid:$issueUuid){
    uuid
    text
  }
}`