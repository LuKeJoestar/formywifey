export interface Heart {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  velocity: { x: number; y: number };
  opacity: number;
}

export interface GardenFlower {
  id: string;
  type: 'rose' | 'tulip' | 'daisy' | 'lavender' | 'orchid';
  color: string;
  x: number; // percentage width
  scale: number;
  swayDelay: number;
  swayDuration: number;
  bloomed: boolean;
}

export interface LoveQuote {
  spanish: string;
  english: string;
}
