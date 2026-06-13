import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getDrawings } from '../src/domain/repositories/drawingRepository.mock';

export default function HomeScreen() {
  const router = useRouter();
  const drawings = getDrawings();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Gambar</Text>
      <FlatList
        data={drawings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/drawing/${item.id}`)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00B3FF',
  },
  icon: { fontSize: 50 },
  name: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
});
