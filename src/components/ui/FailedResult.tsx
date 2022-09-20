import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';

const FailedResult: React.FC = () => (
  <>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box>
        <ErrorIcon style={{ marginRight: '1rem' }} />
        Something went wrong. Try again.
        <ErrorIcon style={{ marginLeft: '1rem' }} />
      </Box>
    </Container>
  </>
);

export default FailedResult;
