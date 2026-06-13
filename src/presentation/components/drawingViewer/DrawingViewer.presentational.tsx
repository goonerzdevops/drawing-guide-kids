import React, { useMemo } from 'react';
import PagerView from 'react-native-pager-view';
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
      <Svg style={styles.svg} viewBox={SVG_VIEWBOX}>
        {paths.map((d, idx) => (
          <SvgPathLayer key={`${index}-${idx}`} svg_path={d} />
        ))}
      </Svg>
    );
  };

  return (
    <PagerView
      style={styles.pager}
      initialPage={activeStepIndex}
      onPageSelected={(e) => {
        const next = e.nativeEvent.position;
        onStepIndexChange(next);
      }}
    >
      {Array.from({ length: stepCount }).map((_, i) => (
        <React.Fragment key={i}>{renderPage(i)}</React.Fragment>
      ))}

      {onPressFinish ? (
        <Svg style={styles.finishSvg} viewBox={SVG_VIEWBOX}>
          <Path
            d="M 20 170 Q 150 60 280 170"
            fill="none"
            stroke="#FF2D55"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </Svg>
      ) : null}
    </PagerView>
  );
}
