import {ScrollView,StyleSheet,TextInput,Text,View,Switch,Pressable} from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {GET_PROFILE_BY_ID, UPDATE_PROFILE} from '../queries/query';
  import {useMutation, useQuery} from '@apollo/client';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  
  const EditPage = ({navigation, route}) => {
    const {data, loading} = useQuery(GET_PROFILE_BY_ID, {
      variables: {getProfileByIdId: route.params.id},
    });
    const [imageUrl, setImageUrl] = useState(data?.getProfileById?.first_name,);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    
    useEffect(() => {
      setFirstName(data?.getProfileById?.first_name);
      setLastName(data?.getProfileById?.last_name);
      setEmail(data?.getProfileById?.email);
      setDescription(data?.getProfileById?.description);
      setImageUrl(data?.getProfileById?.image_url);
      setIsVerified(data?.getProfileById?.is_verified);
    }, [data]);
  
    const [updateProfile] = useMutation(UPDATE_PROFILE, {
      variables: {
        updateProfileId: route.params.id,
        firstName,
        lastName,
        email,
        isVerified,
        imageUrl,
        description,
        is_candidate: false,
      }, 
      onCompleted: () => {
        navigation.navigate('Home');
      },
      onError: error => {
        console.log(error);
      },
    });
  
    return (
      <ScrollView
        style={styles.main}>
        <View
          style={ styles.editHeader }>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={'#555'}
            />
          </Pressable>
          <Text
            style={styles.editHeaderText}>
            Edit Profile
          </Text>
        </View>
        <View>
          <Text
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: '#D2D2D2',
              marginVertical: 4,
            }}
          />
        </View>
        <Text style={ styles.editProfText }>
          Image Link
        </Text>
        <TextInput
          style={styles.inputEditContainer}
          value={loading ? 'loading...' : imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
  
        <View style={styles.inputEditProfNameContainer}>
          <View style={styles.inputEditProfName}>
            <Text
              style={ styles.editProfText }>
              First Name
            </Text>
            <TextInput
              style={styles.inputEditContainer}
              value={loading ? 'loading...' : firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.inputEditProfName}>
            <Text
              style={ styles.editProfText }>
              Last Name
            </Text>
            <TextInput
              style={styles.inputEditContainer}
              value={loading ? 'loading...' : lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>
        <Text style={ styles.editProfText }>
          Email
        </Text>
        <TextInput
          style={styles.inputEditContainer}
          value={loading ? 'loading...' : email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={ styles.editProfText }>
          Description
        </Text>
        <TextInput
          placeholderTextColor={'#999'}
          multiline={true}
          numberOfLines={8}
          style={styles.profileDescription}
          value={loading ? 'loading...' : description}
          onChangeText={text => setDescription(text)}
          placeholder="Add a description"
        />
        <Text style={ styles.editProfText }>
          Verification
        </Text>
        <View style={styles.verification}>
          <View>
            <Text
              style={styles.editProfText}>
              Talent Verified
            </Text>
          </View>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            trackColor={{true: '#6DA9E4', false: '#999'}}
            thumbColor={isVerified ? '#3DACFF' : '#6b7280'}
            value={isVerified}
            onValueChange={() => setIsVerified(!isVerified)}
          />
        </View>
        <Pressable
          android_ripple={{color: '#5BC0F8'}}
          style={styles.btn}
          onPress={() => updateProfile()}>
          <Text style={styles.buttonText}>EDIT</Text>
        </Pressable>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    main: {
      padding: 15,
      backgroundColor: 'white',
    },
    editHeader: {
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
    },
    editHeaderText: {
      fontSize: 25,
      fontWeight: '800',
      color: '#374151',
    },
    profileDescription: {
      textAlignVertical: 'top',
      borderWidth: 1,
      padding: 8,
      borderColor: '#6b7280',
      color: '#374151',
    },
    editProfText: {
      marginVertical: 10,
      color: '#374151',
    },
    inputEditContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#6b7280',
      color: '#374151',
    },
    inputEditProfNameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
    },
    inputEditProfName: {
      flex: 1,
      marginVertical: 10,
      borderColor: '#6b7280',
    },
    verification: {
      borderWidth: 1,
      borderColor: '#6b7280',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    btn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: '#3DACFF',
      alignSelf: 'flex-end',
      marginVertical: 40,
    },
    buttonText: {
      fontWeight: '800',
      color: '#fff',
    },
  });
  
  export default EditPage;
  