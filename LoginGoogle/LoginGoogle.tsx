import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '958361236240-aa3qubgooh1qs06tj506e79i0ma0pbg4.apps.googleusercontent.com',
});
const LoginGoogle = () => {
  const signIn = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log('Đăng nhập thành công:', idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error instanceof Error) {
        const signinError = error as {code?: unknown}; // Chuyển đổi kiểu cho thuộc tính `code`
        if (signinError.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('Đăng nhập bị hủy bởi người dùng');
        } else if (signinError.code === statusCodes.IN_PROGRESS) {
          console.log('Đăng nhập đang trong quá trình xử lý');
        } else if (
          signinError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
          console.log('Play Services không khả dụng');
        } else {
          console.error('Đăng nhập không thành công:', error);
        }
      } else {
        // Nếu lỗi không phải là một instance của Error, bạn có thể xử lý nó như một lỗi không xác định.
        console.error(
          'Đăng nhập không thành công với lỗi không xác định:',
          error,
        );
      }
    }
  };
  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {signIn()}} style={styles.button}>
          <Text style={styles.buttonText}>Login with google</Text>
        </TouchableOpacity>
      </View>
  );
};

export default LoginGoogle;
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
    marginTop:10,
    backgroundColor: '#12c7ff',
    borderRadius: 5,
  },
  icon: {
    width: 25,
    height: 25,
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
