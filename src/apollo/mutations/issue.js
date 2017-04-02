import gql from 'graphql-tag'

export const create = gql`mutation Issue($title: String!){
  issue(title: $title){
    uuid
    title
  }
}`;
export const remove = gql`mutation deleteIssue($uuid: ID!){
  deleteIssue(uuid: $uuid){
    success
  }
}`;
