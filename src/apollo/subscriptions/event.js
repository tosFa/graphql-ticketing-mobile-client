import gql from 'graphql-tag'

export const event = gql`subscription Event($group: String!, $types: [String!], $timestamp: String){
  event(group: $group, types: $types, timestamp: $timestamp){
    payload
  }
}`;