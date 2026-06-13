import React, { useMemo, useRef, useEffect } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { DrawingObject, DrawingStep } from '../../../domain/models/drawing';
import { styles } from './DrawingViewer.styles';

export type DrawingViewerPresentationalProps = {
  object: DrawingObject;
  activeStepIndex: number;
  onStepIndexChange: (nextIndex: number) => void;
  onPressFinish?: () => void;
};

const SVG_VIEWBOX = '0 0 300 200';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PAGE_WIDTH = SCREEN_WIDTH - 40; // padding 20 * 2 from container

function SvgPathLayer({ svg_path }: { svg_path: string }) {
  return (
    <Path
      d={svg_path}
      fill="none"
      stroke="#00B3FF"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function DrawingViewerPresentational({
  object,
  activeStepIndex,
  onStepIndexChange,
  onPressFinish,
}: DrawingViewerPresentationalProps) {
  const steps: DrawingStep[] = object.steps;
  const stepCount = steps.length;
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: activeStepIndex * PAGE_WIDTH, animated: true });
    }
  }, [activeStepIndex]);

  const accumulatedPathsByIndex = useMemo(() => {
    const out: string[][] = [];
    for (let i = 0; i < stepCount; i++) {
      const paths = steps.slice(0, i + 1).map((s) => s.svg_path);
      out.push(paths);
    }
    return out;
  }, [steps, stepCount]);

  const renderPage = (index: number) => {
    const paths = accumulatedPathsByIndex[index] ?? [];
    return (
      <View style={{ width: PAGE_WIDTH }} key={index}>
        <Svg style={styles.svg} viewBox={SVG_VIEWBOX}>
          {paths.map((d, idx) => (
            <SvgPathLayer key={`${index}-${idx}`} svg_path={d} />
          ))}
          {onPressFinish && index === stepCount - 1 ? (
             <Path
               d="M 20 170 Q 150 60 280 170"
               fill="none"
               stroke="#FF2D55"
               strokeWidth={4}
               strokeLinecap="round"
             />
          ) : null}
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.pager}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const next = Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH);
          if (next !== activeStepIndex) {
            onStepIndexChange(next);
          }
        }}
      >
        {Array.from({ length: stepCount }).map((_, i) => renderPage(i))}
      </ScrollView>
    </View>
  );
}
