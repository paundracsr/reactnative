import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import axios from "axios";

const Home = () => {
  const [newsData, setNewsData] = useState([]); // State untuk menyimpan data berita
  const [loading, setLoading] = useState(true); // State untuk menandakan apakah data sedang dimuat
  const [error, setError] = useState(""); // State untuk menangani error
  const [query, setQuery] = useState("tesla"); // State untuk menyimpan query pencarian
  const [searchText, setSearchText] = useState(""); // State untuk menyimpan teks dari input search

  const apiKey = "c89332fadf2348b280255dc453ea8a4d"; // API Key
  const url = `https://newsapi.org/v2/everything?q=apple&from=2024-12-03&to=2024-12-03&sortBy=publishedAt&apiKey=${apiKey}`;

  // Mengambil data dari API menggunakan axios
  useEffect(() => {
    if (!query) return; // Cegah permintaan jika query kosong

    setLoading(true); // Set loading true ketika melakukan pencarian
    axios
      .get(url)
      .then((response) => {
        const filteredArticles = response.data.articles.filter((article) => 
          article.title && article.urlToImage && article.description
        );

        if (filteredArticles.length > 0) {
          setNewsData(filteredArticles);
        } else {
          setError("Tidak ada berita ditemukan.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Gagal memuat berita. Coba lagi nanti.");
        setLoading(false);
      });
  }, [query]); // Mengambil data berita setiap kali query berubah

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert('Link ke berita: ' + item.url)}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.source}>Source: {item.source.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* SearchBar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search News..."
        placeholderTextColor="#B0B0B0"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={() => setQuery(searchText)} // Mengubah query saat submit
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.url}
          renderItem={renderNewsItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Dark background untuk keseluruhan aplikasi
    paddingHorizontal: 20, // Memberikan ruang di sisi kiri dan kanan
    paddingTop: 40, // Memberikan jarak di atas
  },
  searchBar: {
    marginBottom: 20, 
    borderRadius: 8,  
    backgroundColor: '#151313',  
    paddingHorizontal: 15,  
    paddingVertical: 11,
    color: '#ffffff',  
    height: 50,  
    
  },
  card: {
    flexDirection: "row",
    marginBottom: 20, // Memberikan jarak antar card
    padding: 15, // Memberikan padding agar lebih rapi
    borderRadius: 12, // Membuat sudut card lebih melengkung
    backgroundColor: "#151313", // Background card gelap
    overflow: "hidden",
    shadowColor: "#000", // Efek bayangan
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8, // Efek bayangan lebih kuat di Android
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15, // Memberikan jarak antara gambar dan teks
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF", // Teks judul dengan warna putih terang untuk kontras
  },
  description: {
    fontSize: 14,
    color: "#B0B0B0", // Teks deskripsi lebih lembut dengan warna abu-abu
    marginBottom: 10,
  },
  source: {
    fontSize: 12,
    color: "#FFD700", // Menambahkan warna gold pada sumber berita
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
