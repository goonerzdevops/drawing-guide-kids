export type DrawingStep = {
  step: number;
  part_name: string;
  svg_path: string;
};

export type DrawingObject = {
  id: string;
  name: string;
  icon: string;
  steps: DrawingStep[];
};

export type MockData = {
  drawings: DrawingObject[];
};

export type DrawingViewerRouteParams = {
  id: string;
};
