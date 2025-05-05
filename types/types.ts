// types.ts or any filename you prefer

export type DetectionResult = {
  classId: number;
  score: number;
  box: {
    ymin: number;
    xmin: number;
    ymax: number;
    xmax: number;
  };
  timestamp: number; // For synchronization
};

export type SavedGesture = {
  name: string;
  color: string;
  timestamp: number;
};

// Default export of the types
export default {
  DetectionResult: {} as DetectionResult,
  SavedGesture: {} as SavedGesture,
};
