import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { IconRegistry, ApplicationProvider, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping } from '@eva-design/eva';
import { light, dark } from './UIComponents/Themes.js';
import RootNavigation from './navigation/RootNavigation.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    global.theme = dark;
  }

  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={dark}>
          <SafeAreaView style={[styles.container, { backgroundColor: global.theme['background-basic-color-1'] }]}>
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
