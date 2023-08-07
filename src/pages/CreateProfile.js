import {ScrollView, StyleSheet, TextInput, Text, View, Switch, Pressable} from 'react-native';
  import React, {useState} from 'react';
  import {CREATE_PROFILE} from '../queries/query';
  import {useMutation} from '@apollo/client';
  import {Toast} from 'react-native-toast-message/lib/src/Toast';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  
  const CreateProfile = ({navigation, route}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Profile Created!!!',
      });
    };
  
    const [createProfile] = useMutation(CREATE_PROFILE, { variables: {firstName, lastName, email, isVerified, imageUrl, description,},
      onCompleted: () => {
        navigation.navigate('Home');
        route.params.refetch();
        showToast();
      },
      onError: error => {
        console.log(error);
      },
    });
    return (
      <ScrollView
        style={styles.main}>
        <View
          style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={'#555'}
            />
          </Pressable>
          <Text
            style={styles.headerText}>
            Create Profile
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
        <Text style={styles.text}>
          Image Link
        </Text>
        <TextInput
          style={styles.inputContainer}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <View style={styles.inputNameContainer}>
          <View style={styles.inputName}>
            <Text
              style={styles.text}>
              First Name
            </Text>
            <TextInput
              style={styles.inputContainer}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.inputName}>
            <Text
              style={styles.text}>
              Last Name
            </Text>
            <TextInput
              style={ styles.inputContainer}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>
        <Text style={styles.text}>
          Email
        </Text>
        <TextInput
          style={styles.inputContainer}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.text}>
          Description
        </Text>
        <TextInput
          placeholderTextColor={'#999'}
          multiline={true}
          numberOfLines={8}
          style={styles.description}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder="Write a description for the talent"
        />
        <Text style={styles.text}>
          Verification
        </Text>
        <View style={styles.talent}>
          <View>
            <Text
              style={styles.text}>
              Talent Verified
            </Text>
          </View>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            trackColor={{true: '#6DA9E4', false: '#999'}}
            thumbColor={isVerified ? '#3DACFF' : 'gray'}
            value={isVerified}
            onValueChange={() => setIsVerified(!isVerified)}
          />
        </View>
        <Pressable
          android_ripple={{color: '#5BC0F8'}}
          style={styles.button}
          onPress={() => createProfile()}>
          <Text style={styles.btnText}>CREATE</Text>
        </Pressable>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    main: {
      padding: 15,
      backgroundColor: 'white',
    },
    header: {
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
    },
    headerText: {
      fontSize: 25,
      fontWeight: '800',
      color: '#555',
    },
    text: {
      marginVertical: 10,
      color: '#555',
    },
    inputContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      color: '#555',
    },
    inputNameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
    },
    line: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
    },
    inputName: {
      flex: 1,
      marginVertical: 10,
      borderColor: 'gray',
    },
    talent: {
      borderWidth: 1,
      borderColor: 'gray',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    description: {
      textAlignVertical: 'top',
      borderWidth: 1,
      padding: 8,
      borderColor: 'gray',
      color: '#555',
    },
    button: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: '#3DACFF',
      alignSelf: 'flex-end',
      marginVertical: 40,
    },
    btnText: {
      fontWeight: '800',
      color: '#fff',
    },
  });
  
  export default CreateProfile;
  