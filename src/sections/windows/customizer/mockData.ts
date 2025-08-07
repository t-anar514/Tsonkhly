export interface WindowOption {
  id: string;
  name: string;
  image: string;
  captiontext: string[];
  warningText: Array<{ title: string; description: string }>;
  depth: string;
  seals: number;
  discount: string;
  uw: string;
  extra: string | null;
  isDefault?: boolean;
  colorOptionsByMaterial: Array<{ code: string; label: string; color: string; extra: string }>;
  glassOptions: Array<{ name: string; icon: string }>;
}

export const windowOptions: WindowOption[] = [
  {
    id: 'pvc',
    name: 'PVC',
    image:
      'https://img.edilportale.com/product-thumbs/h_kf-510-pvc-window-internorm-italia-595250-rel79e6c505.jpg',
    captiontext: ['flächenbündige Optik', 'Bautiefe', 'Bautiefe2'],
    warningText: [
      {
        title: 'Festverglaste Elemente aus Holz oder Holz-Aluminium',
        description:
          'Bei festverglasten Elementen in Kombination mit Befestigungslöchern wird die Glasscheibe nicht mit Silikon versiegelt.',
      },
    ],
    depth: '60 mm',
    seals: 2,
    discount: '-15%',
    uw: '≤ 1,30',
    extra: null,
    isDefault: false,
    colorOptionsByMaterial: [
      // Рам төрлөөр ялгасан өнгөний сонголтууд
      { code: 'ral8019', label: 'Graubraun RAL 8019', color: '#3F2A24', extra: '' },
      { code: 'ral7024', label: 'Graphitgrau RAL 7024', color: '#4B5055', extra: '+10%' },
      { code: 'ral6005', label: 'Moosgrün RAL 6005', color: '#0C3B2E', extra: '+20%' },
      { code: 'ral3003', label: 'Rubinrot RAL 3003', color: '#981924', extra: '+20%' },
      { code: 'db703', label: 'Eisenglimmer DB 703', color: '#5E5E5E', extra: '+20%' },
      { code: 'ral7016', label: 'Anthrazitgrau RAL 7016 FS', color: '#373A3C', extra: '+20%' },
      { code: 'ral9016', label: 'Weiß RAL 9016', color: '#F4F4F4', extra: '+0%' },
      { code: 'ral9005', label: 'Tiefschwarz RAL 9005', color: '#0A0A0A', extra: '+10%' },
      { code: 'wood1', label: 'Holzstruktur Hell', color: '#A0522D', extra: '+15%' },
      { code: 'wood2', label: 'Holzstruktur Dunkel', color: '#8B4513', extra: '+15%' },
      { code: 'ral5002', label: 'Ultramarinblau RAL 5002', color: '#202A9A', extra: '+20%' },
      { code: 'ral1015', label: 'Hellelfenbein RAL 1015', color: '#FBE9B7', extra: '+15%' },
    ],
    glassOptions: [
      {
        name: 'Давхар шил',
        icon: '/icons/double-glass.svg',
      },
      {
        name: 'Гурав давхар шил',
        icon: '/icons/triple-glass.svg',
      },
      {
        name: 'Low-E шил',
        icon: '/icons/low-e.svg',
      },
      {
        name: 'Хатаасан шил',
        icon: '/icons/tempered-glass.svg',
      },
    ],
  },
  {
    id: 'metal',
    name: 'Metal',
    image:
      'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_385,h_344/https://www.windowclassics.com/wp-content/uploads/2017/05/steel-corner-3.jpg',
    captiontext: ['Metal1', 'Metal2', 'Metal3'],
    warningText: [
      {
        title: 'Metal Frame Warning',
        description:
          'This is a specific warning for metal frames with different content from PVC frames.',
      },
    ],
    depth: '70 mm',
    seals: 2,
    discount: '-20%',
    uw: '≥ 1,10',
    extra: '+10%',
    isDefault: true,
    colorOptionsByMaterial: [
      // Рам төрлөөр ялгасан өнгөний сонголтууд
      { code: 'ral8019', label: 'Graubraun RAL 8019', color: '#3F2A24', extra: '+10%' },
      { code: 'ral7024', label: 'Graphitgrau RAL 7024', color: '#4B5055', extra: '+10%' },
      { code: 'ral6005', label: 'Moosgrün RAL 6005', color: '#0C3B2E', extra: '+20%' },
      { code: 'ral3003', label: 'Rubinrot RAL 3003', color: '#981924', extra: '+20%' },
      { code: 'db703', label: 'Eisenglimmer DB 703', color: '#5E5E5E', extra: '+20%' },
      { code: 'ral7016', label: 'Anthrazitgrau RAL 7016 FS', color: '#373A3C', extra: '+20%' },
      { code: 'ral9006', label: 'Weißaluminium RAL 9006 FS', color: '#C0C0C0', extra: '+20%' },
      { code: 'ral9007', label: 'Graualuminium RAL 9007 FS', color: '#A1A1A1', extra: '+20%' },
      { code: 'ral9011', label: 'Graphitschwarz RAL 9011', color: '#1C1C1C', extra: '+10%' },
      { code: 'ral7035', label: 'Lichtgrau RAL 7035', color: '#D5D5D5', extra: '+10%' },
      { code: 'ral2004', label: 'Reinorange RAL 2004', color: '#F75E25', extra: '+25%' },
      { code: 'ral5015', label: 'Himmelblau RAL 5015', color: '#00A3E0', extra: '+20%' },
    ],
    glassOptions: [
      {
        name: 'Давхар шил',
        icon: '/icons/double-glass.svg',
      },
      {
        name: 'Гурав давхар шил',
        icon: '/icons/triple-glass.svg',
      },
      {
        name: 'Low-E шил',
        icon: '/icons/low-e.svg',
      },
      {
        name: 'Хатаасан шил',
        icon: '/icons/tempered-glass.svg',
      },
    ],
  },
];

// windowOptions is already exported above
