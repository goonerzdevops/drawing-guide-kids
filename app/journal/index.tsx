import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DRAWING_GUIDE_STORAGE_KEY } from '@/constants/drawingGuide';

export default function JournalScreen() {
  const router = useRouter();
  const [uris, setUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUploads() {
      const existing = await AsyncStorage.getItem(DRAWING_GUIDE_STORAGE_KEY);
      if (existing) {
        try {
          const parsed = JSON.parse(existing);
          if (parsed?.uploads?.length) setUris(parsed.uploads);
        } catch {}
      }
      setLoading(false);
    }
    void loadUploads();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00B3FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Jurnal Karya</Text>
      </View>

      {uris.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.empty}>Belum ada karya 🎨</Text>
          <Text style={styles.emptySub}>Lengkapi panduan gambar untuk menambahkan karya</Text>
        </View>
      ) : (
        <FlatList
          data={uris}
          numColumns={3}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.thumbWrap}>
              <Image source={{ uri: item }} style={styles.thumb} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.gridPadding}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backBtn: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#00B3FF', alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { textAlign: 'center', marginTop: 40, color: '#666', fontSize: 18 },
  emptySub: { textAlign: 'center', marginTop: 8, color: '#999', fontSize: 14 },
  gridPadding: { paddingBottom: 20 },
  thumbWrap: { flex: 1 / 3, margin: 6 },
  thumb: { width: '100%', aspectRatio: 1, borderRadius: 12, backgroundColor: '#F0F0F0' },
});
