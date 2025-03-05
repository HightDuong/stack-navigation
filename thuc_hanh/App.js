import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (phoneRegex.test(phone)) {
      setErrorMessage("");
      setIsValid(true);
    } else {
      setErrorMessage("Số điện thoại không hợp lệ!");
      setIsValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing
        Pro
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        placeholderTextColor="#B0B0B0"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(text);
          validatePhoneNumber(text);
        }}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity
        style={[
          styles.button,
          isValid ? styles.buttonActive : styles.buttonDisabled,
        ]}
        disabled={!isValid}
        onPress={() => navigation.navigate("Home")}
      >
        <Text
          style={[
            styles.buttonText,
            isValid ? styles.buttonTextActive : styles.buttonTextDisabled,
          ]}
        >
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với OneHousing Pro!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 10,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  buttonActive: {
    backgroundColor: "#007BFF",
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    fontSize: 16,
  },
  buttonTextActive: {
    color: "#fff",
  },
  buttonTextDisabled: {
    color: "#B0B0B0",
  },
});
