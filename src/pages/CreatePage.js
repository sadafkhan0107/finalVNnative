import {ScrollView, StyleSheet, TextInput, Text, View, Switch, Pressable} from 'react-native';
  import React, {useState} from 'react';
  import {CREATE_PROFILE} from '../queries/query';
  import {useMutation} from '@apollo/client';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  
  const CreatePage = ({navigation, route}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isVerified, setIsVerified] = useState(false);
  
  
    const [createProfile] = useMutation(CREATE_PROFILE, { variables: {firstName, lastName, email, isVerified, imageUrl, description,},
      onCompleted: () => {
        navigation.navigate('Home');
        route.params.refetch();
      },
      onError: error => {
        console.log(error);
      },
    });
    return (
      <ScrollView
        style={styles.createMain}>
        <View
          style={styles.createHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={'#555'}
            />
          </Pressable>
          <Text
            style={styles.createHeaderText}>
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
        <Text style={styles.createText}>
          Image Link
        </Text>
        <TextInput
          style={styles.inputCreateContainer}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <View style={styles.inputNameCreateConatiner}>
          <View style={styles.inputCreateName}>
            <Text
              style={styles.createText}>
              First Name
            </Text>
            <TextInput
              style={styles.inputCreateContainer}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.inputCreateName}>
            <Text
              style={styles.createText}>
              Last Name
            </Text>
            <TextInput
              style={ styles.inputCreateContainer}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>
        <Text style={styles.createText}>
          Email
        </Text>
        <TextInput
          style={styles.inputCreateContainer}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.createText}>
          Description
        </Text>
        <TextInput
          placeholderTextColor={'#999'}
          multiline={true}
          numberOfLines={8}
          style={styles.createDescription}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder="Add a description"
        />
        <Text style={styles.createText}>
          Verification
        </Text>
        <View style={styles.verified}>
          <View>
            <Text
              style={styles.createText}>
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
          style={styles.btn}
          onPress={() => createProfile()}>
          <Text style={styles.buttonText}>CREATE</Text>
        </Pressable>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    createMain: {
      padding: 15,
      backgroundColor: 'white',
    },
    createHeader: {
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
    },
    createHeaderText: {
      fontSize: 25,
      fontWeight: '800',
      color: '#555',
    },
    createText: {
      marginVertical: 10,
      color: '#555',
    },
    inputCreateContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      color: '#555',
    },
    inputNameCreateConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
    },
    inputCreateName: {
      flex: 1,
      marginVertical: 10,
      borderColor: 'gray',
    },
    verified: {
      borderWidth: 1,
      borderColor: 'gray',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    createDescription: {
      textAlignVertical: 'top',
      borderWidth: 1,
      padding: 8,
      borderColor: 'gray',
      color: '#555',
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
  
  export default CreatePage;
  