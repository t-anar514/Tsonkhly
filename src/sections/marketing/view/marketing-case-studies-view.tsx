import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export default function MarketingCaseStudiesView() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Case Studies
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          This is a placeholder for the marketing case studies view.
        </Typography>
      </Box>
    </Container>
  );
}
