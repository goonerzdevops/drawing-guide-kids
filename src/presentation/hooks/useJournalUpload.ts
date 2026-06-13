import { useCallback } from 'react';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { DRAWING_GUIDE_STORAGE_KEY } from '@/constants/drawingGuide';

export function useJournalUpload() {
  const pickImageFromGallery = useCallback(async (): Promise<string | null> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.9,
      selectionLimit: 1,
    });

    if (result.canceled) return null;
    const asset = result.assets?.[0];
    return asset?.uri ?? null;
  }, []);

  const saveUploadUri = useCallback(async (uri: string) => {
    const existing = await AsyncStorage.getItem(DRAWING_GUIDE_STORAGE_KEY);
    const parsed: { uploads: string[] } | null = existing ? JSON.parse(existing) : null;
    const uploads = parsed?.uploads ?? [];
    uploads.push(uri);
    await AsyncStorage.setItem(DRAWING_GUIDE_STORAGE_KEY, JSON.stringify({ uploads }));
  }, []);

  return { pickImageFromGallery, saveUploadUri };
}
