import type { MockData } from '../models/drawing';

const data: MockData = require('../../../constants/mockData.json');

export function getDrawings(): MockData['drawings'] {
  return data.drawings;
}

export function getDrawingById(id: string): MockData['drawings'][number] | undefined {
  return data.drawings.find((d: MockData['drawings'][number]) => d.id === id);
}
