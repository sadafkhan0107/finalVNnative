import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/pages/HomePage';
import EditPage from './src/pages/EditPage';
import CreatePage from './src/pages/CreatePage';

const Stack = createStackNavigator();
const apiUrl = 'https://api.poc.graphql.dev.vnplatform.com/graphql';

const httpLink = createHttpLink({uri: apiUrl});

const authLink = setContext(_ => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6InNhZGFmLmtoYW4wMDdAYWlkZXRpYy5pbiIsImlzX2NhbmRpZGF0ZSI6dHJ1ZSwiaWF0IjoxNjkxNDA2ODE1LCJleHAiOjE2OTE5MjUyMTV9.N6GXHhnIQzii7kWjjKhu0Idpo8-W-NujYj7u0Q1NWPU';

  return {
    headers: {
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{title: 'Home', headerShown: false}}
          />
          <Stack.Screen
            name="Create Page"
            component={CreatePage}
            options={{title: 'Create Page', headerShown: false}}
          />
          <Stack.Screen
            name="Edit Page"
            component={EditPage}
            options={{title: 'Edit Page', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
