import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, Text, Button, } from '@ui-kitten/components';
import { ArrowBackIcon } from "../assets/icons/icons.js";

const PAGE_TITLE = 'Solution'

export default class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const renderMenuAction = () => (
            <TopNavigationAction
                icon={ArrowBackIcon}
                onPress={() => this.props.navigation.goBack()}
            />
        );
        return (
            <React.Fragment>
                <TopNavigation
                    title={PAGE_TITLE}
                    alignment="center"
                    leftControl={renderMenuAction()}
                />
                <Layout level='3' style={styles.container}>
                </Layout>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});