/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import LoginGoogle from './LoginGoogle/LoginGoogle';
import LoginWithFacebook from './loginFB/LoginWithFacebook';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {

  return (
    <SafeAreaView>
      <LoginGoogle/>
      <LoginWithFacebook/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default App;
