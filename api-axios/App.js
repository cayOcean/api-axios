import React, { useEffect, useState } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [catUrl, setCatUrl] = useState(null);

  async function fetchCat() {
    try {
      const result = await axios.get("https://api.thecatapi.com/v1/images/search?limit=1");
      setCatUrl(result.data[0].url); // pega a URL da imagem do gato
    } catch (error) {
      console.log("Erro:", error);
    }
  }

  // carrega um gato assim que o app abre
  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <View style={styles.container}>
      {catUrl && (
        <Image 
          source={{ uri: catUrl }} 
          style={{ width: 300, height: 300, borderRadius: 12 }} 
        />
      )}
      <Button title="Mostrar outro gato 🐱" onPress={fetchCat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  }
});
