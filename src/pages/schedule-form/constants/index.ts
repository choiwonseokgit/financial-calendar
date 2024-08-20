export const PASTEL_COLORS = [
  {
    name: 'purple',
    color: '#8979BA',
  },
  {
    name: 'rose',
    color: '#BF7EB8',
  },
  {
    name: 'pink',
    color: '#F497A9',
  },
  {
    name: 'peach',
    color: '#F9BC86',
  },
  {
    name: 'mint-green',
    color: '#9DD87E',
  },
  {
    name: 'olive',
    color: '#C7D290',
  },
  {
    name: 'mint-blue',
    color: '#82CCB3',
  },
  {
    name: 'yellow',
    color: '#FCF69E',
  },
  {
    name: 'blue-gray',
    color: '#7B89C6',
  },
  {
    name: 'coral',
    color: '#E17582',
  },
] as const;

export type TPastelColors = (typeof PASTEL_COLORS)[number];
