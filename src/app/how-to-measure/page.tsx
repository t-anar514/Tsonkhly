'use client';

import MainLayout from 'src/layouts/main';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Grid,
  Divider,
  Link,
} from '@mui/material';
import Iconify from 'src/components/iconify';

export default function HowToMeasurePage() {
  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {/* Main Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          ЦОНХ ХЭРХЭН ХЭМЖИХ ВЭ
        </Typography>

        {/* Introduction */}
        <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', fontSize: '1.1rem' }}>
          Шинэ барилгын цонх эсвэл хуучин цонхыг хэмжих нь таны бодож байгаагаас хялбар юм. Үүнийг бүр ч хялбар болгохын тулд бид доорх зааварт салбарын нууцуудыг хуваалцаж байна.
        </Typography>

        {/* Download Link */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Button
            component={Link}
            href="#"
            variant="contained"
            color="warning"
            startIcon={<Iconify icon="eva:download-fill" />}
            sx={{ mb: 2 }}
          >
            Хэмжилтийн хуудас татах
          </Button>
        </Box>

        {/* Contact Information */}
        <Paper sx={{ p: 3, mb: 6, bgcolor: 'background.neutral' }}>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Хэрэв танд цонх хэмжих талаар асуулт байвал эсвэл тоосгон хүрээтэй байна гэж үзэж байвал бидэнд дуудаж болно: <strong>855-290-6366</strong>, бид танд үйл явцыг алхам алхамаар тайлбарлаж өгнө!!
          </Typography>
        </Paper>

        {/* First Section - Brick/Block/Rock Windows */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4, fontWeight: 'bold' }}>
          ТООСГО, БЛОК, ЭСВЭЛ ЧУЛУУН ЦОНХ
        </Typography>

        <Stack spacing={3} sx={{ mb: 6 }}>
          <Typography variant="body1" component="ol" sx={{ pl: 2 }}>
            <li>Гэрийн гадна талаас нээлхийн өргөнийг дээд, дунд, доод хэсгээр хэмжинэ.</li>
            <li>Хамгийн нарийн хэмжээг авч 1/4 инч хасана. Энэ нь таны захиалах цонхны өргөн болно.</li>
            <li>Нээлхийн өндрийг зүүн тал, дунд, баруун талд хэмжинэ.</li>
            <li>Хамгийн богино хэмжээг авч 1/4 инч хасана. Энэ нь таны захиалах цонхны өндөр болно.</li>
            <li>Нээлх бүрт давтана.</li>
          </Typography>
        </Stack>

        {/* Diagrams */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  border: '2px solid #000',
                  position: 'relative',
                  mb: 2,
                }}
              >
                {/* Width measurement arrows */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    right: '10%',
                    height: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid #000',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    },
                    '&::before': {
                      left: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      right: 0,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    right: '10%',
                    height: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid #000',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    },
                    '&::before': {
                      left: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      right: 0,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '80%',
                    left: '10%',
                    right: '10%',
                    height: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid #000',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    },
                    '&::before': {
                      left: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      right: 0,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Хамгийн богино хэмжээг авч 1/4" хасана
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  border: '2px solid #000',
                  position: 'relative',
                  mb: 2,
                }}
              >
                {/* Height measurement arrows */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '20%',
                    top: '10%',
                    bottom: '10%',
                    width: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: -4,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid #000',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                    },
                    '&::before': {
                      top: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      bottom: 0,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '10%',
                    bottom: '10%',
                    width: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: -4,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid #000',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                    },
                    '&::before': {
                      top: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      bottom: 0,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '80%',
                    top: '10%',
                    bottom: '10%',
                    width: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: -4,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid #000',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                    },
                    '&::before': {
                      top: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      bottom: 0,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Хамгийн богино хэмжээг авч 1/4" хасана
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Second Section - Wood/Hardie/Vinyl/Stucco Windows */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4, fontWeight: 'bold' }}>
          МОД, ХАРДИ®, ВИНИЛ ХАВТАН, ЭСВЭЛ СТУККО ЦОНХ*
        </Typography>

        <Stack spacing={3} sx={{ mb: 6 }}>
          <Typography variant="body1" component="ol" sx={{ pl: 2 }}>
            <li>Гэрийн дотор талаас нээлхийн өргөнийг дээд, дунд, доод хэсгээр хэмжинэ.</li>
            <li>Хамгийн нарийн хэмжээг авч 1/8 инч хасана. Энэ нь таны захиалах цонхны өргөн болно.</li>
            <li>Нээлхийн өндрийг зүүн тал, дунд, баруун талд хэмжинэ.</li>
            <li>Хамгийн богино хэмжээг авч 1/8 инч хасана. Энэ нь таны захиалах цонхны өндөр болно.</li>
            <li>Нээлх бүрт давтана.</li>
          </Typography>
        </Stack>

        {/* Additional Diagrams */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 150,
                  border: '2px solid #000',
                  position: 'relative',
                  mb: 2,
                }}
              >
                {/* Single width measurement arrow */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    right: '10%',
                    height: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid #000',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    },
                    '&::before': {
                      left: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      right: 0,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Хамгийн богино хэмжээг авч 1/8" хасана
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 150,
                  border: '2px solid #000',
                  position: 'relative',
                  mb: 2,
                }}
              >
                {/* Height measurement arrows */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '20%',
                    top: '10%',
                    bottom: '10%',
                    width: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: -4,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid #000',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                    },
                    '&::before': {
                      top: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      bottom: 0,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '10%',
                    bottom: '10%',
                    width: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: -4,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid #000',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                    },
                    '&::before': {
                      top: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      bottom: 0,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '80%',
                    top: '10%',
                    bottom: '10%',
                    width: 2,
                    bgcolor: '#000',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: -4,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid #000',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                    },
                    '&::before': {
                      top: 0,
                      transform: 'rotate(180deg)',
                    },
                    '&::after': {
                      bottom: 0,
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Хамгийн богино хэмжээг авч 1/8" хасана
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Additional Notes */}
        <Paper sx={{ p: 4, bgcolor: 'background.neutral', mb: 6 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>*</strong> Хэрэв та стукко хэрэглэхээр төлөвлөж байгаа бол стукко хавтгайтай retrofit цонх суурилуулах арга техникийг ашиглах бол бидэнд дуудаж, хэмжилтийн үйл явцыг алхам алхамаар тайлбарлаж өгье. Энэ нь маш хялбар юм.
          </Typography>
          
          <Typography variant="body1">
            Хэрэв танд цонх хэмжих талаар асуулт байвал эсвэл гадна талын тоосгон хүрээтэй байна гэж үзэж байвал, эсвэл хуучин барилгын зэрэглэлийн винил цонхтой бол бидэнд дуудаж болно: <strong>855-290-6366</strong>, бид танд хэмжилтийн үйл явцыг алхам алхамаар тайлбарлаж өгнө!!
          </Typography>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="/windows/customizer"
            variant="contained"
            size="large"
            startIcon={<Iconify icon="eva:arrow-forward-fill" />}
            sx={{ mr: 2 }}
          >
            Цонх захиалах
          </Button>
          <Button
            component={Link}
            href="/contact"
            variant="outlined"
            size="large"
            startIcon={<Iconify icon="eva:phone-fill" />}
          >
            Холбоо барих
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
} 