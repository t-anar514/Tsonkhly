'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Rating,
  Divider,
  MenuItem,
} from '@mui/material';

import { InstallerProfile } from '../types/window-types';

// Mock data for installers
const MOCK_INSTALLERS: InstallerProfile[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Premier Window Installation',
    rating: 4.8,
    reviews: 124,
    location: 'Seattle, WA',
    contactInfo: {
      email: 'john@premierwindows.com',
      phone: '(206) 555-1234',
    },
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    price: {
      perWindowRate: 85,
    },
    specializations: ['Residential', 'Vinyl Windows', 'Energy-Efficient Windows'],
  },
  {
    id: '2',
    name: 'Emily Johnson',
    company: 'Modern Glass & Window',
    rating: 4.9,
    reviews: 87,
    location: 'Bellevue, WA',
    contactInfo: {
      email: 'emily@modernglass.com',
      phone: '(425) 555-5678',
    },
    availability: ['Wed', 'Thu', 'Fri', 'Sat'],
    price: {
      hourlyRate: 95,
    },
    specializations: ['Commercial', 'Custom Windows', 'Bay Windows'],
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    company: 'Rodriguez Window Services',
    rating: 4.6,
    reviews: 56,
    location: 'Tacoma, WA',
    contactInfo: {
      email: 'michael@rodriguezwindows.com',
      phone: '(253) 555-9012',
    },
    availability: ['Mon', 'Tue', 'Fri', 'Sat', 'Sun'],
    price: {
      perWindowRate: 75,
      hourlyRate: 85,
    },
    specializations: ['Residential', 'Commercial', 'Historic Building Restoration'],
  },
];

// ----------------------------------------------------------------------

export default function InstallerFinder() {
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [installers, setInstallers] = useState<InstallerProfile[]>(MOCK_INSTALLERS);

  // Mock locations for dropdown
  const LOCATIONS = ['Seattle, WA', 'Bellevue, WA', 'Tacoma, WA', 'Redmond, WA', 'Kirkland, WA'];
  
  // Mock specializations for dropdown
  const SPECIALIZATIONS = [
    'Residential', 
    'Commercial', 
    'Vinyl Windows', 
    'Wood Windows',
    'Custom Windows',
    'Energy-Efficient Windows',
    'Bay Windows',
    'Historic Building Restoration'
  ];

  // Filter installers based on location and specialization
  const filterInstallers = () => {
    let filtered = [...MOCK_INSTALLERS];
    
    if (location) {
      filtered = filtered.filter(installer => installer.location === location);
    }
    
    if (specialization) {
      filtered = filtered.filter(installer => 
        installer.specializations.some(spec => spec === specialization)
      );
    }
    
    setInstallers(filtered);
  };
  
  const clearFilters = () => {
    setLocation('');
    setSpecialization('');
    setInstallers(MOCK_INSTALLERS);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Find a Window Installation Professional
      </Typography>
      
      <Card sx={{ p: 3, mb: 5 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              select
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {LOCATIONS.map((loc) => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              select
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              {SPECIALIZATIONS.map((spec) => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Stack direction="row" spacing={1}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={filterInstallers}
              >
                Search
              </Button>
              
              <Button 
                fullWidth 
                variant="outlined" 
                onClick={clearFilters}
              >
                Clear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      
      {installers.length > 0 ? (
        <Stack spacing={3}>
          {installers.map((installer) => (
            <Card key={installer.id} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <Stack direction="row" spacing={2}>
                    <Avatar 
                      alt={installer.name}
                      src={`/assets/images/avatar_${installer.id}.jpg`}
                      sx={{ width: 64, height: 64 }}
                    />
                    
                    <Stack spacing={0.5}>
                      <Typography variant="h5">{installer.name}</Typography>
                      <Typography variant="body2">{installer.company}</Typography>
                      
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Rating value={installer.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          ({installer.reviews} reviews)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2">
                    <strong>Location:</strong> {installer.location}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Pricing:</strong>{' '}
                    {installer.price.perWindowRate && `$${installer.price.perWindowRate}/window`}
                    {installer.price.perWindowRate && installer.price.hourlyRate && ' or '}
                    {installer.price.hourlyRate && `$${installer.price.hourlyRate}/hour`}
                  </Typography>
                  
                  <Button 
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Contact Now
                  </Button>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">
                      <strong>Specializations:</strong> {installer.specializations.join(', ')}
                    </Typography>
                    
                    <Typography variant="body2">
                      <strong>Available:</strong> {installer.availability.join(', ')}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6">
            No installers found matching your criteria.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Try adjusting your filters or search in a different area.
          </Typography>
        </Card>
      )}
    </Container>
  );
}
