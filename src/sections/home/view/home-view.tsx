'use client';

import { useScroll } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from '@mui/material';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import ScrollProgress from 'src/components/scroll-progress';

// ----------------------------------------------------------------------

// Features section data
const FEATURES = [
  {
    icon: 'carbon:tools-alt',
    title: 'Захиалгат Загвар',
    description: 'Манай хялбар хэрэглэгдэх багажуудаар өөрийн гэрт яг тохирсон цонхыг загварчилна.',
  },
  {
    icon: 'carbon:certificate',
    title: 'Дээд Зэрэглэлийн Чанар',
    description:
      'Өндөр чанартай материал болон эрчим хүч хэмнэдэг шилний сонголтуудаас сонгоно уу.',
  },
  {
    icon: 'carbon:delivery',
    title: 'Мэргэжлийн Суурилуулалт',
    description:
      'Таны бүс дэх мэргэшсэн суурилуулагчидтай холбогдож мэргэжлийн цонх суурилуулалт хийлгэнэ.',
  },
  {
    icon: 'carbon:calculator',
    title: 'Шуурхай Үнийн Санал',
    description:
      'Цонхоо өөрийн төсөвт тохируулан загварчлахдаа бодит цагийн үнийн тооцоог авна уу.',
  },
];

// Window style showcase data
const WINDOW_STYLES = [
  {
    image: '/assets/window1.jpg',
    title: '1 Цонхтой',
    description: 'Хажуугаараа тогтоогддог, гадагш нээгдэж дээд зэргийн агааржуулалт өгнө.',
  },
  {
    image: '/assets/window2.jpg',
    title: '2 Цонхтой',
    description: 'Хоёр хөдөлгөөнт хэсэгтэй, босоогоор дээш доош хөдөлдөг сонгодог загвар.',
  },
  {
    image: '/assets/images/placeholder.png',
    title: '3 Цонхтой',
    description: 'Гэрийн гаднаас гадагш үргэлжилж, дотор талд нэмэлт орон зай үүсгэнэ.',
  },
];

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 96px)' },
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/background/overlay_1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Stack spacing={5} sx={{ color: 'common.white' }}>
                <Typography variant="h1" component="h1">
                  Захиалгат Цонх
                  <br />
                  Загвар & Суурилуулалт
                </Typography>

                <Typography variant="h5" sx={{ opacity: 0.8 }}>
                  Гэрийн сайхан, эрчим хүч хэмнэдэг цонхыг загварчилж, мэргэжлийн суурилуулагчидтай
                  холбогдон ажлаа дуусгана.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={RouterLink}
                    href="/windows/customizer"
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<Iconify icon="carbon:pen" />}
                  >
                    Загварчлал Эхлүүлэх
                  </Button>
                  <Button
                    component={RouterLink}
                    href="/windows/installers"
                    variant="outlined"
                    size="large"
                    sx={{ color: 'common.white', borderColor: 'common.white' }}
                    startIcon={<Iconify icon="carbon:search" />}
                  >
                    Суурилуулагч Хайх
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 10, md: 15 } }}>
        <Container>
          <Stack spacing={3} sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2">Яагаад Манай Цонхыг Сонгох Вэ?</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto' }}>
              Манай захиалгат цонхнууд нь танай гэрийн үзэмж, эрчим хүчний хэмнэлт болон тав тухыг
              сайжруулахаар зориулж хийгдсэн.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {FEATURES.map((feature, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Iconify
                    icon={feature.icon}
                    width={48}
                    height={48}
                    sx={{ mb: 2, mx: 'auto', color: 'primary.main' }}
                  />
                  <Typography variant="h5" paragraph>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: 'background.neutral' }}>
        <Container>
          <Stack spacing={3} sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2">Хэрхэн Ажилладаг Вэ</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto' }}>
              Манай энгийн үйл явц нь танай гэрт захиалгат цонх загварчлах, худалдаж авах,
              суурилуулахыг хялбар болгоно.
            </Typography>
          </Stack>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      typography: 'h5',
                    }}
                  >
                    1
                  </Box>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography variant="h5">Цонхоо Загварчлах</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Манай харилцан үйлчилгээтэй цонх загварчлагчаар хэмжээ, материал, өнгө болон
                      бусад зүйлийг сонгоно уу.
                    </Typography>
                  </Stack>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      typography: 'h5',
                    }}
                  >
                    2
                  </Box>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography variant="h5">Захиалгаа Өгөх</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Өөрийн загварыг хянаж, шуурхай үнийн санал аваад, захиалгаа аюулгүй байдлаар
                      өгөөрэй.
                    </Typography>
                  </Stack>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      typography: 'h5',
                    }}
                  >
                    3
                  </Box>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography variant="h5">Суурилуулагчидтай Холбогдох</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Хүргэлтийн дараа таны бүс нутагт байгаа баталгаатай мэргэжлийн суурилуулагчдын
                      сүлжээгээр хайна уу.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/assets/illustrations/illustration_dashboard.svg"
                alt="Хэрхэн Ажилладаг Вэ"
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              component={RouterLink}
              href="/windows/customizer"
              size="large"
              variant="contained"
              endIcon={<Iconify icon="carbon:arrow-right" />}
            >
              Өөрийн Цонхыг Загварчлаж Эхэл
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Window Styles Section */}
      <Box sx={{ py: { xs: 10, md: 15 } }}>
        <Container>
          <Stack spacing={3} sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2">Тренд Цонхны Загварууд</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto' }}>
              Манай хамгийн эрэлттэй цонхны загваруудыг судалж, өөрийн гэрт яг тохирох цонхыг ол.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {WINDOW_STYLES.map((style, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia component="img" height="240" image={style.image} alt={style.title} />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {style.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {style.description}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href="/windows/customizer"
                      variant="text"
                      endIcon={<Iconify icon="carbon:arrow-right" />}
                    >
                      Энэ Загварыг Тохируулах
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/background/overlay_2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          color: 'common.white',
        }}
      >
        <Container>
          <Stack spacing={4} alignItems="center">
            <Typography variant="h2">Гэрээ Өөрчлөхөд Бэлэн Үү?</Typography>

            <Typography variant="h5" sx={{ maxWidth: 800, opacity: 0.8 }}>
              Өнөөдөр өөрийн төгс цонхыг загварчилж, ажлыг дуусгахын тулд мэргэжлийн
              суурилуулагчидтай холбогдоорой.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                href="/windows/customizer"
                variant="contained"
                size="large"
                color="primary"
              >
                Загварчлал Эхлүүлэх
              </Button>
              <Button
                component={RouterLink}
                href="/windows/installers"
                variant="outlined"
                size="large"
                sx={{ color: 'common.white', borderColor: 'common.white' }}
              >
                Суурилуулагч Хайх
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
