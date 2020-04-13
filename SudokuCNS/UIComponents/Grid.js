import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const GRID_MARGIN = 8;

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0,
        };
    }

    componentDidMount() {
        this.setState({ screenWidth: Math.round(Dimensions.get('window').width) });
    }

    render() {
        const { values = [] } = this.props;
        return (
            <React.Fragment>
                <Layout style={[styles.outerContainer, { width: this.state.screenWidth - GRID_MARGIN, height: this.state.screenWidth - GRID_MARGIN }]}>
                    <Layout style={styles.horizontalMiniGrid}>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[0]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[1]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[2]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[9]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[10]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[11]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[18]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[19]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[20]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[27]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[28]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[29]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[36]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[37]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[38]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[45]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[46]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[47]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[54]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[55]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[56]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[63]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[64]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[65]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[72]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[73]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[74]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>
                    <Layout style={styles.horizontalMiniGrid}>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[3]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[4]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[5]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[12]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[13]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[14]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[21]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[22]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[23]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[30]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[31]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[32]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[39]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[40]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[41]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[48]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[49]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[50]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[57]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[58]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[59]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[66]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[67]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[68]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[75]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[76]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[77]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>
                    <Layout style={styles.horizontalMiniGrid}>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[6]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[7]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[8]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[15]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[16]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[17]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[24]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[25]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[26]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[33]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[34]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[35]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[42]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[43]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[44]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[51]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[52]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[53]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout style={styles.container0}>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[60]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[61]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[62]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[69]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[70]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[71]}</Text></Layout>
                                </Layout>
                                <Layout style={styles.container1}>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[78]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[79]}</Text></Layout>
                                    <Layout style={styles.container2} level='2'><Text style={styles.text} category='h3'>{values[80]}</Text></Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        margin: 4,
        padding: 2,
        borderRadius:2,
        flexDirection: "row",
        backgroundColor: "gray"
    },
    horizontalMiniGrid: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "gray"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "gray"
    },
    container0: {
        flex: 1,
        margin: 1,
        flexDirection: "column",
        backgroundColor: "gray"
    },
    container1: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "gray"
    },
    container2: {
        flex: 1,
        margin: 1,
        borderRadius:2,

    },
    text: {
        flex: 1,
        alignSelf: "center",
        textAlignVertical: 'center',
    },
});