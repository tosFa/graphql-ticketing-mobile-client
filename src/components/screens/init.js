import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { StackNavigator } from 'react-navigation';
import Issue from './issue';
import Issues from './issues';
import Login from './adminLogin';
import IssueForm from '../forms/issue';
import { create } from '../../apollo/mutations/issue';


export const Init = (props) => {
  console.log({ props });
  return <IssueForm
    onSubmit={(values) => {
      props.create(values)
      .then(response => {
        if (response.data.issue && response.data.issue.uuid) {
          props.navigation.navigate('Issue', { uuid: response.data.issue.uuid, user: values.user, title: values.title })

        }
      })
    } }
  />;
};

const withMutation = graphql(create, {
  props: ({ ownProps, mutate }) => ({
    create: ({ title, user }) => {
      return mutate({
        variables: { title, user },
        //optimisticResponse: {
        //  __typename: 'Mutation',
        //  submitComment: {
        //    __typename: 'Message',
        //    id: null,
        //    postedBy: ownProps.currentUser,
        //    createdAt: +new Date(),
        //    content: commentContent,
        //  },
        //}
      })
    }

  })
})

const BasicApp = StackNavigator({
  Home: {screen: Login},
  Issue: {screen: Issue},
  Issues: {screen: Issues},
});

export default BasicApp;