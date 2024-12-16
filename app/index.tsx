import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [scale] = useState(new Animated.Value(1));

  // Fungsi untuk login
  function login() {
    if (username === "admin" && password === "admin") {
      router.push({
        pathname: "/Home", // Ganti dengan rute dashboard yang sesuai
        params: { username },
      });
    } else if (username === "" || password === "") {
      Alert.alert("Error", "Please enter username and password");
    } else {
      Alert.alert("Error", "Invalid username or password");
    }
  }

  // Fungsi animasi saat tombol ditekan
  const animateButtonPress = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Perkecil tombol
      useNativeDriver: true,
    }).start();
  };

  // Fungsi animasi saat tombol dilepaskan
  const animateButtonRelease = () => {
    Animated.spring(scale, {
      toValue: 1, // Kembalikan ukuran tombol
      useNativeDriver: true,
    }).start();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <Animated.View
              style={[styles.button, { transform: [{ scale }] }]}
            >
              <TouchableOpacity
                style={styles.buttonInner}
                onPressIn={animateButtonPress} // Ketika tombol ditekan
                onPressOut={animateButtonRelease} // Ketika tombol dilepaskan
                onPress={login}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text style={styles.link} onPress={() => router.push("/register")}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Gelap untuk background seluruh container
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  scrollContainer: {
    flexGrow: 1,  // Pastikan ScrollView mengisi seluruh tinggi layar
    justifyContent: 'center', // Menjaga konten berada di tengah
    paddingBottom: 30,
    backgroundColor: '#121212', // Gelap untuk ScrollView
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1E1E1E', // Warna sedikit lebih terang untuk form
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow untuk Android
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Warna gold untuk judul
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#292929',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#E0E0E0',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    width: '100%',  // Lebarkan tombol menjadi 100% lebar container
    maxWidth: 500,  // Tentukan lebar maksimal tombol jika terlalu besar
    height: 60,     // Lebar dan tinggi tombol yang lebih besar
    backgroundColor: '#FFD700',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    overflow: 'hidden', // Untuk tombol dengan sudut melengkung
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginTop: 15,
    textAlign: 'center',
  },
  link: {
    color: '#FFD700',
    textDecorationLine: 'underline',
  },
});
