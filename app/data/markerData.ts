export type MarkerState = 'reserved' | 'reserved_by_me' | 'available'
export type TreeType = 'Eucalyptus' | 'Mango' | 'Acacia' | 'Teak' | 'Moringa' | 'Cashew' | 'Grevillea'

export type MarkerType = {
  id: number,
  coordinate: { latitude: number; longitude: number },
  state: MarkerState,
  area: string,
  treeType: TreeType,
  treeAmount: number,
  compensation: string,
};


export const markers: MarkerType[] = [
  { id: 1, coordinate: { latitude: 9.004631, longitude: 38.022385 }, state: 'available', area: '40m²', treeType: 'Eucalyptus', treeAmount: 9, compensation: '180 SSP' },
  { id: 2, coordinate: { latitude: 9.504631, longitude: 38.122385 }, state: 'reserved_by_me', area: '90m²', treeType: 'Mango', treeAmount: 14, compensation: '220 SSP' },
  { id: 3, coordinate: { latitude: 9.204631, longitude: 37.522385 }, state: 'available', area: '100m²', treeType: 'Acacia', treeAmount: 20, compensation: '290 SSP' },
  { id: 4, coordinate: { latitude: 8.804631, longitude: 38.522385 }, state: 'reserved', area: '230m²', treeType: 'Teak', treeAmount: 32, compensation: '420 SSP' },
  { id: 5, coordinate: { latitude: 8.604631, longitude: 38.522385 }, state: 'reserved_by_me', area: '110m²', treeType: 'Moringa', treeAmount: 18, compensation: '300 SSP' },
  { id: 6, coordinate: { latitude: 8.604631, longitude: 38.122385 }, state: 'available', area: '200m²', treeType: 'Cashew', treeAmount: 23, compensation: '320 SSP' },
  { id: 7, coordinate: { latitude: 8.694631, longitude: 38.022385 }, state: 'available', area: '140m²', treeType: 'Eucalyptus', treeAmount: 19, compensation: '260 SSP' },
  { id: 8, coordinate: { latitude: 8.404631, longitude: 37.322385 }, state: 'reserved', area: '140m²', treeType: 'Grevillea', treeAmount: 11, compensation: '240 SSP' },
  { id: 9, coordinate: { latitude: 8.204631, longitude: 37.522385 }, state: 'available', area: '190m²', treeType: 'Eucalyptus', treeAmount: 16, compensation: '220 SSP' },
  { id: 10, coordinate: { latitude: 8.104631, longitude: 38.222385 }, state: 'reserved', area: '150m²', treeType: 'Mango', treeAmount: 14, compensation: '290 SSP' },
  { id: 11, coordinate: { latitude: 9.704631, longitude: 38.722385 }, state: 'available', area: '200m²', treeType: 'Acacia', treeAmount: 19, compensation: '290 SSP' },
  { id: 12, coordinate: { latitude: 9.704631, longitude: 38.022385 }, state: 'available', area: '110m²', treeType: 'Teak', treeAmount: 13, compensation: '230 SSP' },
  { id: 13, coordinate: { latitude: 9.804631, longitude: 37.522385 }, state: 'reserved', area: '270m²', treeType: 'Moringa', treeAmount: 27, compensation: '410 SSP' },
  { id: 14, coordinate: { latitude: 9.704631, longitude: 37.502385 }, state: 'available', area: '200m²', treeType: 'Cashew', treeAmount: 23, compensation: '310 SSP' },
  { id: 15, coordinate: { latitude: 9.014631, longitude: 37.422385 }, state: 'available', area: '170m²', treeType: 'Grevillea', treeAmount: 25, compensation: '330 SSP' },
  { id: 16, coordinate: { latitude: 8.604631, longitude: 37.722385 }, state: 'available', area: '90m²', treeType: 'Teak', treeAmount: 16, compensation: '220 SSP' },
]
