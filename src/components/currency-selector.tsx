import { useState } from 'react';
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useCurrency } from 'src/contexts/currency-context';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as 'CNY' | 'MNT');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth size="small">
        <Select
          value={currency}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          displayEmpty
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiSelect-icon': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiSelect-select': {
              paddingRight: '24px',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'background.paper',
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="CNY">
            <Typography variant="body2">CNY</Typography>
          </MenuItem>
          <MenuItem value="MNT">
            <Typography variant="body2">MNT</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} 