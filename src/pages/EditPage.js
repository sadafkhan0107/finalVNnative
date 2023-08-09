import {ScrollView,StyleSheet,TextInput,Text,View,Switch,Pressable} from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {GET_PROFILE_BY_ID, UPDATE_PROFILE} from '../queries/query';
  import {useMutation, useQuery} from '@apollo/client';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  
  const EditPage = ({navigation, route}) => {
    const {data, loading} = useQuery(GET_PROFILE_BY_ID, {
      variables: {getProfileByIdId: route.params.id},
    });
    const [imageUrl, setProfImgUrl] = useState(data?.getProfileById?.first_name,);
    const [firstName, setProfFirstName] = useState('');
    const [lastName, setProfLastName] = useState('');
    const [email, setProfEmail] = useState('');
    const [description, setProfDescription] = useState('');
    const [isVerified, setProfIsVerified] = useState(false);
    
    useEffect(() => {
      setProfFirstName(data?.getProfileById?.first_name);
      setProfLastName(data?.getProfileById?.last_name);
      setProfEmail(data?.getProfileById?.email);
      setProfDescription(data?.getProfileById?.description);
      setProfImgUrl(data?.getProfileById?.image_url);
      setProfIsVerified(data?.getProfileById?.is_verified);
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
              color={'#6b7280'}
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
              borderColor: '#d3d1d2',
              marginVertical: 4,
            }}
          />
        </View>
        <Text style={ styles.editProfText }>
          Image Link
        </Text>
        <TextInput
          style={styles.inputEditContainer}
          value={loading ? '' : imageUrl}
          onChangeText={text => setProfImgUrl(text)}
        />
  
        <View style={styles.inputEditProfNameContainer}>
          <View style={styles.inputEditProfName}>
            <Text
              style={ styles.editProfText }>
              First Name
            </Text>
            <TextInput
              style={styles.inputEditContainer}
              value={loading ? '' : firstName}
              onChangeText={text => setProfFirstName(text)}
            />
          </View>
          <View style={styles.inputEditProfName}>
            <Text
              style={ styles.editProfText }>
              Last Name
            </Text>
            <TextInput
              style={styles.inputEditContainer}
              value={loading ? '' : lastName}
              onChangeText={text => setProfLastName(text)}
            />
          </View>
        </View>
        <Text style={ styles.editProfText }>
          Email
        </Text>
        <TextInput
          style={styles.inputEditContainer}
          value={loading ? '' : email}
          onChangeText={text => setProfEmail(text)}
        />
        <Text style={ styles.editProfText }>
          Description
        </Text>
        <TextInput
          placeholderTextColor={'#9ca3af'}
          multiline={true}
          numberOfLines={8}
          style={styles.profileDescription}
          value={loading ? '' : description}
          onChangeText={text => setProfDescription(text)}
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
            trackColor={{true: '#6DA9E4', false: '#9ca3af'}}
            thumbColor={isVerified ? '#3DACFF' : '#6b7280'}
            value={isVerified}
            onValueChange={() => setProfIsVerified(!isVerified)}
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
      color: '#f9fafb',
    },
  });
  
  export default EditPage;
  