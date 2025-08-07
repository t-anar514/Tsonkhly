import { Box, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { ReactNode } from 'react';

// Define type for warning text object structure
type WarningText = {
  title: string;
  description: string;
};

type StepWrapperProps = {
  children: ReactNode;
  warningText?: WarningText[];
  // Keeping fallback title and content for backward compatibility
  fallbackTitle?: string;
  fallbackContent?: string;
  stepNumber?: number; // Add stepNumber prop to determine which step we're on
};

export default function StepWrapper({
  children,
  warningText = [],
  fallbackTitle = 'Api fallback data',
  fallbackContent = 'Api fallback data',
  stepNumber,
}: StepWrapperProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Show the information box ONLY on the first step */}
      {stepNumber === 0 && (
        <>
          {/* If we have API warning text, show each warning */}
          {warningText && warningText.length > 0 ? (
            warningText.map((warning, index) => (
              <Box
                key={`warning-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 2,
                  mb: 3,
                  bgcolor: 'warning.lighter',
                  border: '1px solid',
                  borderColor: 'warning.light',
                  borderRadius: 1,
                }}
              >
                <Iconify
                  icon="mdi:information"
                  sx={{ color: 'warning.main', mr: 1, mt: 0.25, width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'inline' }}>
                    {warning.title}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'inline' }}>
                    : {warning.description}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            /* Otherwise show fallback content */
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                p: 2,
                mb: 3,
                bgcolor: 'warning.lighter',
                border: '1px solid',
                borderColor: 'warning.light',
                borderRadius: 1,
              }}
            >
              <Iconify
                icon="mdi:information"
                sx={{ color: 'warning.main', mr: 1, mt: 0.25, width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'inline' }}>
                  {fallbackTitle}
                </Typography>
                <Typography variant="body2" sx={{ display: 'inline' }}>
                  : {fallbackContent}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}

      {children}
    </Box>
  );
}
