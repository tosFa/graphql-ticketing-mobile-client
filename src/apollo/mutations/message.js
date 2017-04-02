import gql from 'graphql-tag';

export const create = gql`mutation Message($text: String!, $issueUuid: ID!){
  message(text:$text, issueUuid: $issueUuid){
    uuid
    author{
      email
    }
  }
}`;