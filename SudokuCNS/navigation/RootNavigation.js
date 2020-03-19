import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import CameraPage from "../pages/CameraPage.js";
import ResultsPage from "../pages/ResultsPage.js";
import AboutUSPage from "../pages/AboutUsPage.js";

const RootStackNavigator = createStackNavigator(
    {
        CameraPage: { screen: CameraPage },
        ResultsPage: { screen: ResultsPage },
        AboutUSPage: { screen: AboutUSPage },
    },
    {
        headerMode: "none"
    }
);

const App = createAppContainer(RootStackNavigator);

export default App;