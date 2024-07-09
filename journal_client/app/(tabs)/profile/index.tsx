import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { User } from '@/models/user';
import { errorText } from '@/constants/Errors';
import { PasswordReset } from '@/components/PasswordReset';
import { journalService } from '@/services/journalService';

export interface errorGroup {
  username: string | null;
}

export interface summaryInterface {
  today: number;
  past_week: number,
  past_month: number
}

export default function Profile() {

  const { getUser, updateUsername, onLogout } = useAuth();
  const [user, setUser] = useState<User | null>({} as User);
  const [summary, setSummary] = useState<summaryInterface>({} as summaryInterface);
  const [updateName, setUpdateUsername] = useState<boolean>(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState<boolean>(false);
  const [errors, setError] = useState({} as errorGroup);

  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    fetchData();
    fetchSummary();
  }, []);

  const fetchData = () => {
    getUser!().then(user => {
      setUser(user);
    }).catch(err => {
      console.error(err);
    });
  };

  const validateForm = () => {
    let error: errorGroup = {} as errorGroup;
    if (username.length < 4 || username.length > 10) error.username = 'Please use a length between 4 to 10 characters';
    if (!username) error.username = 'Please provide a username';

    setError(error);
    return Object.values(error).every(value => value === null);

  };

  const fetchSummary = () => {
    journalService.getSummary().then(res => {

      setSummary(res);
    }).catch(err => {
      console.error(err);
    });
  }

  const changeUsername = async () => {
    if (validateForm()) {
      const res = await updateUsername!('newUsername');
      if (res.error) {

        Alert.alert('Something happened!', 'Unable to update the username at this time');
        return;
      }
      setUser(res);
    }

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // we might have profile picture updates in future
            }}>
            <View style={styles.profileAvatarWrapper}>

              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1614807547811-4174d3582092?w=256&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D&h=256',
                }}
                style={styles.profileAvatar} />

              <TouchableOpacity
                onPress={() => {
                  setUpdateUsername(true);
                }}>
                <View style={styles.profileAction}>
                  <Feather name="edit-2" size={15} color="#fff" />

                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>{user ? user.username : ''}</Text>

            <Text style={styles.profileAddress}>
              Jacaranda Avenue. Nairobi
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.row} >
              <Text style={styles.rowLabel}>Today</Text>
              <View style={styles.rowSpacer} />
              <Text>{summary.today}</Text>
            </View>
            <View style={styles.row} >
              <Text style={styles.rowLabel}>Past week</Text>
              <View style={styles.rowSpacer} />
              <Text>{summary.past_week}</Text>
            </View>
            <View style={styles.row} >
              <Text style={styles.rowLabel}>This month</Text>
              <View style={styles.rowSpacer} />
              <Text>{summary.past_month}</Text>
            </View>

            {/* based on the kind of summary we need */}

            {/* <TouchableOpacity
              onPress={() => {
                router.push('(tabs)/profile/summary');
              }}
              style={styles.row}>

              <Text style={styles.rowLabel}>Your activity</Text>
              <View style={styles.rowSpacer} />

              <Feather
                color="#C6C6C6"
                name="activity"
                size={20} />
            </TouchableOpacity> */}

          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => {
                setPasswordModalVisible(true);
              }}
              style={styles.row}>


              <Text style={styles.rowLabel}>Change password</Text>

              <View style={styles.rowSpacer} />

              <Feather
                color="#C6C6C6"
                name="lock"
                size={20} />
            </TouchableOpacity>

          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                // perhaps
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                <Feather color="#fff" name="flag" size={15} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />

              <Feather
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // perhaps
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <Feather color="#fff" name="mail" size={15} />
              </View>

              <Text style={styles.rowLabel}>Contact Us</Text>

              <View style={styles.rowSpacer} />

              <Feather
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onLogout!();
                router.push('/');
              }}
              style={styles.row}>


              <Text style={styles.rowLabel}>Logout</Text>

              <View style={styles.rowSpacer} />

              <Feather
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={updateName}
          onRequestClose={() => setUpdateUsername(false)}
        >
          <View style={styles.modalView}>
            <Text>Update your username</Text>
            <TextInput
              style={styles.input}
              placeholder='Username'
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
              autoCapitalize='none' />
            {errors.username && <Text style={errorText.style}>{errors.username}</Text>}
            <View style={styles.actions}>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setUpdateUsername(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={changeUsername}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Modal>

        <PasswordReset isVisible={passwordModalVisible} onClose={(value) => setPasswordModalVisible(false)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },

  //*** summary*/
  summary: {
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',

  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c99180",
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#c99180',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },

});