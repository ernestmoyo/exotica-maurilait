import type { Region } from '@/types';

export const REGIONS: Region[] = [
  { id: 'port-louis', name: 'Port Louis' },
  { id: 'pamplemousses', name: 'Pamplemousses' },
  { id: 'riviere-du-rempart', name: 'Rivière du Rempart' },
  { id: 'flacq', name: 'Flacq' },
  { id: 'grand-port', name: 'Grand Port' },
  { id: 'savanne', name: 'Savanne' },
  { id: 'black-river', name: 'Black River' },
  { id: 'plaines-wilhems', name: 'Plaines Wilhems' },
  { id: 'moka', name: 'Moka' },
  { id: 'curepipe', name: 'Curepipe' },
  { id: 'quatre-bornes', name: 'Quatre Bornes' },
  { id: 'rodrigues', name: 'Rodrigues' },
];

export const REGION_MAP = Object.fromEntries(REGIONS.map((r) => [r.id, r]));
