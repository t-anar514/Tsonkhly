import { Box, Typography, TextField, Divider, Grid, FormControlLabel, Radio } from '@mui/material';
import Iconify from 'src/components/iconify';
import { WindowCustomization } from '../../types/window-types';

type AdditionalOptionsStepProps = {
  windowCustomization: WindowCustomization;
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFeature: (feature: keyof NonNullable<WindowCustomization['additionalFeatures']>) => void;
};

export default function AdditionalOptionsStep({
  windowCustomization,
  onChangeColor,
  onChangeQuantity,
  onChangeFeature,
}: AdditionalOptionsStepProps) {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Өнгө
      </Typography>
      <TextField
        fullWidth
        type="text"
        label="Өнгө"
        value={windowCustomization.color}
        onChange={onChangeColor}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        Тоо хэмжээ
      </Typography>
      <TextField
        fullWidth
        type="number"
        label="Тоо хэмжээ"
        value={windowCustomization.quantity}
        onChange={onChangeQuantity}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        Цонхны Төрөл
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Radio
                checked={!windowCustomization.additionalFeatures?.topLight && !windowCustomization.additionalFeatures?.bottomLight}
                onChange={() => {
                  onChangeFeature('topLight');
                  onChangeFeature('bottomLight');
                }}
              />
            }
            label="Энгийн Цонх"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Radio
                checked={!!windowCustomization.additionalFeatures?.topLight}
                onChange={() => onChangeFeature('topLight')}
              />
            }
            label="Дээд Гэрэлтэй"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Radio
                checked={!!windowCustomization.additionalFeatures?.bottomLight}
                onChange={() => onChangeFeature('bottomLight')}
              />
            }
            label="Доод Гэрэлтэй"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        Нэмэлт Үйлчилгээнүүд
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Radio
                checked={!!windowCustomization.additionalFeatures?.grids}
                onChange={() => onChangeFeature('grids')}
              />
            }
            label="Торлол"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Radio
                checked={!!windowCustomization.additionalFeatures?.screens}
                onChange={() => onChangeFeature('screens')}
              />
            }
            label="Тор"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Radio
                checked={!!windowCustomization.additionalFeatures?.energyEfficient}
                onChange={() => onChangeFeature('energyEfficient')}
              />
            }
            label="Эрчим Хүч Хэмнэлттэй"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Radio
                checked={!!windowCustomization.additionalFeatures?.soundProofing}
                onChange={() => onChangeFeature('soundProofing')}
              />
            }
            label="Дуу Тусгаарлагч"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
