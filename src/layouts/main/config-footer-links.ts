import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

// Footer links to replace pageLinks that was removed from config-navigation
export const pageLinks = [
  {
    subheader: 'Цонх ба Хаалганы Зөвлөгөө',
    items: [
      { title: 'Цонх Авах', path: paths.windows.customizer },
      { title: 'Хэмжилт Хийх Заавар', path: paths.howToMeasure },
      { title: 'Холбоо Барих', path: paths.marketing.contact },
    ],
  },
  {
    subheader: 'Тусламж',
    items: [
      { title: 'Тусламж', path: paths.support },
    ],
  },
];
