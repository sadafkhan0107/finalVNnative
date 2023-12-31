import {View, Text, StyleSheet, TextInput, Pressable, FlatList, Image} from 'react-native';
  import React, {useState} from 'react';
  import {useQuery} from '@apollo/client/react';
  import {GET_ALL_PROFILES} from '../queries/query';
  import ProfileCard from '../components/ProfileCard';
  import AntIcon from 'react-native-vector-icons/AntDesign';
  
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
  
    const debounce = (callback, delay) => {
      let timerId;
      clearTimeout(timerId);
      return (...args) => {
        timerId = setTimeout(() => {
          callback.apply(this, args);
        }, delay);
      };
    };
    const handleChangeText = text => {
      setsearchString(text);
    };
  
    return (
      <View
        style={styles.main}>
        <View
          style={ styles.header }>
          <Image source={require('../assests/viralNationLogo.png')} />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View>
            <TextInput
              placeholderTextColor={'#020517'}
              style={ styles.inputContainer}
              placeholder="Search "
              value={searchString}
              onChangeText={text => debounce(handleChangeText(text), 500)}
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-end',}}>
            <Pressable
              android_ripple={{color: '#5BC0F8'}}
              style={styles.btn}
              onPress={() => navigation.navigate('Create Page', {refetch: refetch})}>
              <Text>
                <AntIcon name="adduser" color='#3DACFF' size={26} />
              </Text>
              <Text style={styles.buttonText}>CREATE PROFILE</Text>
            </Pressable>
          </View>
  
          <View style={styles.profileCard}>
            {error && (
              <View>
                <Text
                  style={styles.bold}>
                  Error!!!
                </Text>
              </View>
            )}
            {data?.getAllProfiles.size > 0 ? (
              <FlatList
                style={{height: '80%'}}
                data={data.getAllProfiles.profiles}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View key={item.id}>
                    <ProfileCard
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
                  style={ styles.bold}>
                  Loading..
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={styles.bold}>
                  Profile not available.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    main: {
      backgroundColor: 'white',
      flex: 1,
    },
    header: {
      paddingHorizontal: 10,
      paddingVertical: 18,
      backgroundColor: '#fafafa',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 6,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 10,
    },
    icons: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    inputContainer: {
      marginTop: 25,
      marginBottom: 25,
      padding: 5,
      borderWidth: 1,
      borderColor: '#6b7280',
      color: '#020617',
    },
    profileCard: {
      marginTop: 12,
      marginBottom: 120,
    },
    bold: {
      fontWeight: 'bold',
      color: '#374151',
      fontSize: 18,
      marginTop: 10,
    },
    btn: {
      padding: 8,
      borderColor:'#3DACFF',
      borderWidth:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6
    },
    buttonText: {
      color: '#3DACFF',
      textAlign: 'center',
      fontWeight: '700',
    },
  });
  export default HomePage;
  