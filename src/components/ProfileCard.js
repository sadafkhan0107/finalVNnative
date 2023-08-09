import {StyleSheet, Text, View, Image, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {DELETE_PROFILE} from '../queries/query';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserProfile = ({profile, navigation, refetch}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    variables: {deleteProfileId: profile.id},
    onCompleted: () => {
      refetch();
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <View style={styles.profCard}>
      <View style={styles.profNameContainer}>
        {profile?.image_url.includes('https') ? (
          <Image source={{uri: `${profile.image_url}`}} width={45} height={45} style={styles.image} />
        ) : (
          <View style={styles.profPicDisplay}>
            <Text style={{color: '#999', fontWeight: '800'}}>
              {profile?.first_name.slice(0, 1).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={{flex: 1, gap:8}}>
          <View style={styles.line}>
            <View >
              <View style={{display:'flex', flexDirection:'row', gap:4}}>
                <Text>
                  {profile.first_name}
                </Text>
                <Text>
                  {profile.last_name}
                </Text>
                <Text>
                  {profile.is_verified ? (<MaterialIcons name="verified" size={18} color="#3DACFF" />) : null}
                </Text>
              </View>
              <Text>
                {profile.email}
              </Text>
            </View>
            <View style={styles.menuIcon}>
              <Text onPress={() => setOpenModal(!openModal)}>
                <Entypo name="dots-three-vertical" size={24} color="#D8D8D8" />
              </Text>
              {openModal && (
              <View style={{position:'absolute', top:20, left:0, width:200}}>
                <Pressable 
                  onPress={() => { navigation.navigate('Edit Page', {id: profile.id});
                  setOpenModal(!openModal); }}>
                  <Text>
                    {' '}
                    Edit
                  </Text>
                </Pressable>
                <View>
                  <Text style={{ height: 1, borderWidth: 1, borderColor: '#D2D2D2', marginVertical: 10 }} />
                </View>
                <Pressable
                  onPress={() => {
                    setOpenDeleteModal(true);
                    setOpenModal(!openModal);
                  }}>
                  <Text>
                    Delete
                  </Text>
                </Pressable>
              </View>
            )}
            </View>
            
          </View>
        </View>
      </View>
      <Text>
        {profile.description}
      </Text>
      <Modal visible={openDeleteModal} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View
            style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={styles.modalHeading}>
                Remove Profile
              </Text>
              <Ionicons name="close" size={30} color= '#374151'  onPress={() => setOpenDeleteModal(false)} />
            </View>
            <View>
              <Text style={{ height: 1, borderWidth: 1, borderColor: '#D2D2D2', marginVertical: 10, }} />
            </View>
            <Text>
              Removed profile will be deleted permanently and won't be available
              anymore.
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 30, marginTop: 10 }}>
              <Pressable
                onPress={() => setOpenDeleteModal(false)}
                style={styles.modalButtonCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonDelete}
                onPress={() => {
                  setOpenDeleteModal(false);
                  deleteProfile();
                }}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  profNameContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  profPicDisplay: {
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 100,
    backgroundColor: '#D8D8D8',
    color: '#6b7280',
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  profCard: {
    padding: 10,
    marginVertical: 10,
    gap: 8,
    backgroundColor: '#F5F5F5',
    borderRadius:8,
  },
  image: {
    borderRadius: 100,
  },
  menuIcon: {
    position:'relative'
  },
  modal: {
    position: 'absolute',
    right: 4,
    top: 26,
    backgroundColor: 'white',
    padding: 8,
    width: 70,
    zIndex: 10,
  },
  modalText: {
    textAlign: 'center',
    color: '#999',
  },
  modalHeading: {
    fontSize: 25, 
    fontWeight: '500', 
    color: '#6b7280'
  },
  modalView: {
    backgroundColor: '#F5F5F5',
    width: '85%',
    height: 220,
    padding: 20,
    borderRadius: 2,
  },
  modalContent: {
    color: '#6b7280',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 20,
  },
  modalButtonCancel: {
    padding: 8,
    width: '40%',
    backgroundColor: '#999',
    borderRadius: 2,
  },
  modalButtonDelete: {
    padding: 10,
    width: '50%',
    backgroundColor: '#C51605',
    borderRadius: 4,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#f8fafc',
    textAlign: 'center',
  },
});
