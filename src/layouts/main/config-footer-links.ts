import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

// Footer links to replace pageLinks that was removed from config-navigation
export const pageLinks = [
  {
    subheader: 'Цонх ба Хаалганы Зөвлөгөө',
    items: [
      { title: 'Цонх Авах', path: paths.windows.customizer },
      { title: 'Хэмжилт Хийх Заавар', path: '/how-to-measure' },
      { title: 'Зааварчилгаа Видео', path: '/how-to-videos' },
      { title: 'Сэтгэгдлүүд', path: '/gallery-testimonials' },
      { title: 'Холбоо Барих', path: paths.marketing.contact },
    ],
  },
  {
    subheader: 'Тусламж',
    items: [
      { title: 'Түгээмэл асуултууд', path: '/faq' },
      { title: 'Нөхцөл болон дүрэм', path: '/terms-of-service' },
      { title: 'Нууцлалын бодлого', path: '/privacy-policy' },
    ],
  },
];
