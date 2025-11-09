import { createNativeStackNavigator } from "@react-navigation/native-stack";
//navbar from navbar tutorial https://www.youtube.com/watch?v=AnjyzruZ36E&t=25s
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ImportScreen from "./src/screens/ImportScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Import"
        component={ImportScreen}
        options={{ headerShown: false }} //hide the header again
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator>
          <Tab.Screen name="Main" component={MainStack}></Tab.Screen>
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
