import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from "react-native";
import api from "./src/services/api";

export default function App() {
  const [images, setImages] = useState([]);
  const [count, setCount] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchDogs() {
    setLoading(true);
    setError(null);
    setImages([]);
    try {
      const num = parseInt(count) || 1;
      const requests = [];
      for (let i = 0; i < num; i++) {
        requests.push(api.get("/breeds/image/random"));
      }
      const results = await Promise.all(requests);
      const urls = results.map((res) => res.data.message);
      setImages(urls);
    } catch (err) {
      // @ts-ignore
      setError("Erro ao buscar imagens. Verifique sua conexão.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> DogsFinder</Text>
      <Text style={styles.subtitle}>Digite quantos cachorros você quer ver:</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={count}
        onChangeText={setCount}
        placeholder="Ex: 3"
      />

      <Button title="Buscar Cachorros" onPress={fetchDogs} />

      {loading && <Text style={styles.loading}>Carregando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#1e1e2f", 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ffcc00", // amarelo vibrante
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: "#d1d1e0",
    textAlign: "center",
  },
  input: {
    width: 120,
    height: 45,
    borderWidth: 1,
    borderColor: "#ffcc00",
    borderRadius: 12,
    textAlign: "center",
    marginBottom: 12,
    backgroundColor: "#2c2c3e",
    color: "#fff",
    fontSize: 16,
  },
  loading: {
    marginTop: 12,
    fontSize: 16,
    color: "#00cfff",
    fontWeight: "bold",
  },
  error: {
    marginTop: 12,
    fontSize: 16,
    color: "#ff4d4d",
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 25,
    paddingBottom: 30,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ffcc00", // borda vibrante
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
});

