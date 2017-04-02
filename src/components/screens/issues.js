import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import { list } from '../../apollo/queries/issue';
import { create } from '../../apollo/mutations/issue';
import IssueForm from '../forms/issue';

const withData = graphql(list, {
  props: ({ data }) => ({ apollo: data }),
  options: {
    fetchPolicy: "network-only"
  }
});


const mapMutationToProps = graphql(create, {
  props: ({ ownProps, mutate }) => ({
    createNewIssue: ({ title }) =>  mutate({ variables: { title } })
  })
});


export class Issues extends Component {
  static navigationOptions = {
    title: 'Issues',
  }

  constructor(props) {
    super(props);

    this.state = { issues: [] };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.apollo.loading) {
      this.setState({ issues: nextProps.apollo.issues });
    }
  }

  goToIssue = ({ uuid, title }) => {
    this.props.navigation.navigate('Issue', { uuid, title })
  }

  render() {
    if (this.props.apollo.loading) {
      return null;
    }

    return (
      <View>
        <Text>Create New Issue</Text>
        <IssueForm onSubmit={({ title }) => {
          this.props.createNewIssue({ title })
            .then((response) => {
              this.setState({ issues: [...this.state.issues, response.data.issue ]});
              this.goToIssue(response.data.issue);
            })
        }}/>
        <Text>Existing Issues</Text>
        <FlatList
          data={this.state.issues.map(item => ({ ...item, key: item.uuid }))}
          renderItem={({ item }) =>
            <TouchableHighlight onPress={ () => this.goToIssue(item) }>
              <Text>{item.title}</Text>
            </TouchableHighlight>
          }
        />
      </View>
    );
  }
}

export default mapMutationToProps(withData(Issues));
