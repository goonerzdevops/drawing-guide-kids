import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { DrawingViewerContainer } from '../../src/presentation/components/drawingViewer/DrawingViewer.container';

export default function DrawingPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <View style={styles.container}>
        <Text>Data tidak ditemukan</Text>
      </View>
    );
  }

  return <DrawingViewerContainer id={id} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
