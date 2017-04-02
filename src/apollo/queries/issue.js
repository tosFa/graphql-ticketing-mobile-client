import gql from 'graphql-tag'

export const entity = gql`query IssueWithMessages($uuid:ID!, $lastItem: ID, $limit: Int){
  issue(uuid: $uuid){
    uuid
    title
    customerUuid
    author{
      email
    }
  }
  messages(lastItem: $lastItem, limit: $limit, issueUuid: $uuid){
    uuid
    text
    author{
      email
    }
  }
}`;

export const list = gql`query Issues($lastItem: String, $limit: Int){
  issues(lastItem: $lastItem, limit: $limit){
    uuid
    title
    customerUuid
  }
}`;
