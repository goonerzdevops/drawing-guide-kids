import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

import type { DrawingObject } from '../../../domain/models/drawing';
import { DRAWING_GUIDE_STORAGE_KEY } from '../../../constants/drawingGuide';

import { DrawingViewerPresentational } from './DrawingViewer.presentational';
import { styles as containerStyles } from './DrawingViewer.styles';
import { useJournalUpload } from '../../hooks/useJournalUpload';

// Load static data
const mockData = require('../../../../../constants/mockData.json') as { drawings: DrawingObject[] };

export type DrawingViewerContainerProps = {
  id: string;
};

export function DrawingViewerContainer({ id }: DrawingViewerContainerProps) {
  const [drawingObject, setDrawingObject] = useState<DrawingObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { pickImageFromGallery, saveUploadUri } = useJournalUpload();

  useEffect(() => {
    const object = mockData.drawings.find((d) => d.id === id);
    if (object) {
      setDrawingObject(object);
    }
    setLoading(false);
  }, [id]);

  const onStepIndexChange = useCallback((nextIndex: number) => {
    setActiveStepIndex(nextIndex);
  }, []);

  const handleFinishPress = useCallback(async () => {
    const uri = await pickImageFromGallery();
    if (uri) {
      await saveUploadUri(uri);
      alert('Karya disimpan!');
    }
  }, [pickImageFromGallery, saveUploadUri]);

  if (loading || !drawingObject) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color="#00B3FF" />
      </View>
    );
  }

  const isLastStep = activeStepIndex === drawingObject.steps.length - 1;

  return (
    <View style={containerStyles.container}>
      <DrawingViewerPresentational
        object={drawingObject}
        activeStepIndex={activeStepIndex}
        onStepIndexChange={onStepIndexChange}
        onPressFinish={isLastStep ? handleFinishPress : undefined}
      />

      <View style={styles.nextButtonWrap}>
        <Button
          title={isLastStep ? 'Selesai & Upload Karya' : 'Berikutnya'}
          color={isLastStep ? '#FF2D55' : '#00B3FF'}
          onPress={() => {
            if (isLastStep) {
              void handleFinishPress();
              return;
            }
            setActiveStepIndex((prev) => Math.min(prev + 1, drawingObject.steps.length - 1));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nextButtonWrap: {
    width: '100%',
    paddingVertical: 14,
  },
});
