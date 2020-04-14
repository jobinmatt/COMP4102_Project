import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { IconRegistry, ApplicationProvider, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { light, dark } from './UIComponents/Themes.js';
import RootNavigation from './navigation/RootNavigation.js';
import * as firebase from 'firebase';
import FirebaseConfig from './config/FirebaseConfig';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    global.theme = dark;
    console.disableYellowBox = true;
    if (!firebase.apps.length) { // Check to see if Firebase app is already initialized on Android
      app = firebase.initializeApp(FirebaseConfig.firebaseConfig);
    }
    
  }

  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <SafeAreaView style={[styles.container, { backgroundColor: global.theme['color-primary-900'] }]}>
            <Layout>
              {Platform.OS === 'ios' && <StatusBar barStyle={global.theme == light ? 'dark-content' : 'light-content'} />}
              {Platform.OS === 'android' && <Layout style={{ marginTop: StatusBar.currentHeight }} />}
            </Layout>
            <RootNavigation />
          </SafeAreaView>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
