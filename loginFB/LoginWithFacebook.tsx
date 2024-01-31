import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const LoginWithFacebook = () => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  async function signinWithFB() {
    let res = await onFacebookButtonPress();
    console.log('res => ', res);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          signinWithFB();
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWithFacebook;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    padding: 10,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#12c7ff',
    borderRadius: 5,
  },
  buttonText: {
    flex: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    //fontFamily:'Roboto-Bold'
  },
});
