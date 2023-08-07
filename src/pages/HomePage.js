import {View, Text, StyleSheet, TextInput, Pressable, FlatList, Image} from 'react-native';
  import React, {useState} from 'react';
  import {useQuery} from '@apollo/client/react';
  import {GET_ALL_PROFILES} from '../queries/query';
  import ProfileCard from '../components/ProfileCard';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import AntIcon from 'react-native-vector-icons/AntDesign';
  import VNlogo from '../assests/viralNationLogo.png';
import UserProfile from '../components/ProfileCard';
  
  const HomePage = ({navigation}) => {
    const [searchString, setsearchString] = useState('');
    const [page] = React.useState(0);
    const [rows] = React.useState(16);
    const [key] = useState('email');
    const [sort] = useState('asc');
  
    const {loading, data, refetch, error} = useQuery(GET_ALL_PROFILES, {
      variables: {
        orderBy: {
          key,
          sort,
        },
        rows,
        page,
        searchString,
      },
      fetchPolicy: 'network-only',
    });
  
    const debounce = (func, delay) => {
      let timer;
      clearTimeout(timer);
      return (...args) => {
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };
    const handleChangeText = text => {
      setsearchString(text);
    };
  
    return (
      <View
        style={styles.container}>
        <View
          style={ styles.navbar }>
          <Image source={require('../assests/viralNationLogo.png')} style={ styles.logo }/>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View>
            <TextInput
              placeholderTextColor={'#999'}
              style={ styles.inputContainer}
              placeholder="Search..."
              value={searchString}
              onChangeText={text => debounce(handleChangeText(text), 300)}
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-end',}}>
            <Pressable
              android_ripple={{color: '#5BC0F8'}}
              style={styles.button}
              onPress={() => navigation.navigate('Create', {refetch: refetch})}>
              <Text>
                <AntIcon name="adduser" color='#3DACFF' size={26} />
              </Text>
              <Text style={styles.btnText}>CREATE PROFILE</Text>
            </Pressable>
          </View>
  
          <View style={styles.userprofile}>
            {error && (
              <View>
                <Text
                  style={styles.boldText}>
                  Something went wrong!!!
                </Text>
              </View>
            )}
            {data?.getAllProfiles.size > 0 ? (
              <FlatList
                style={{height: '77%'}}
                data={data.getAllProfiles.profiles}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View key={item.id}>
                    <UserProfile
                      profile={item}
                      navigation={navigation}
                      refetch={refetch}
                    />
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            ) : loading ? (
              <View>
                <Text
                  style={ styles.boldText}>
                  Loading..
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={styles.boldText}>
                  No Profiles Available.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 21,
      backgroundColor: '#F5F5F5',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 10,
    },
    icons: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
    },
    logo: {
      fontSize: 26,
      fontWeight: '700',
      color: '#333',
    },
    inputContainer: {
      marginTop: 25,
      marginBottom: 25,
      padding: 5,
      borderWidth: 1,
      borderColor: 'gray',
      color: 'black',
    },
    userprofile: {
      marginTop: 15,
      marginBottom: 100,
    },
    boldText: {
      fontWeight: 'bold',
      color: '#555',
      fontSize: 18,
      marginTop: 10,
    },
    button: {
      padding: 7,
      borderColor:'#3DACFF',
      borderWidth:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6
    },
    btnText: {
      color: '#3DACFF',
      textAlign: 'center',
      fontWeight: '700',
    },
    line: {
      height: 1,
      borderWidth: 0.5,
      borderColor: '#D1D1D1',
      marginTop: 5,
    },
  });
  export default HomePage;
  