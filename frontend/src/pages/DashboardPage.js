import React, { useState } from 'react';
import { Box, Typography, Card, Button, Snackbar, Alert, Grid, IconButton, Tooltip } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

const mockFiles = [
  { id: 1, name: 'match-highlights.pdf', type: 'pdf', shared: false },
  { id: 2, name: 'team-photo.jpg', type: 'image', shared: true, shareLink: 'https://boundary.box/share/abc123', expiresAt: '2024-07-01T12:00:00Z' },
];

const DashboardPage = () => {
  const [files, setFiles] = useState(mockFiles);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [shareLink, setShareLink] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([...files, { id: files.length + 1, name: file.name, type: file.type, shared: false }]);
      setSnackbar({ open: true, message: 'File uploaded successfully!', severity: 'success' });
    }
  };

  const handleDownload = (file) => {
    setSnackbar({ open: true, message: `Downloading ${file.name}...`, severity: 'info' });
  };

  const handleShare = (file) => {
    const link = `https://boundary.box/share/${file.id}${Math.random().toString(36).substring(2, 8)}`;
    setShareLink(link);
    setFiles(files.map(f => f.id === file.id ? { ...f, shared: true, shareLink: link, expiresAt: '2024-07-01T12:00:00Z' } : f));
    setSnackbar({ open: true, message: 'Share link generated!', severity: 'success' });
    navigator.clipboard.writeText(link);
  };

  return (
    <Box maxWidth="900px" mx="auto" mt={4}>
      <Card sx={{ p: 4, mb: 4, bgcolor: '#e3f2fd', border: '2px dashed #1A73E8', textAlign: 'center' }}>
        <input
          accept="*"
          style={{ display: 'none' }}
          id="file-upload-input"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload-input">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ fontWeight: 700, px: 4, py: 2 }}
          >
            Upload File
          </Button>
        </label>
        <Box mt={2} display="flex" alignItems="center" justifyContent="center">
          <SportsCricketIcon sx={{ color: 'primary.main', fontSize: 40, mr: 1 }} />
          <Typography variant="h6" color="primary">
            Drag & drop coming soon!
          </Typography>
        </Box>
      </Card>
      <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
        Your Files
      </Typography>
      <Grid container spacing={2}>
        {files.map(file => (
          <Grid item xs={12} md={6} key={file.id}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 2 }}>
              <Box display="flex" alignItems="center">
                <SportsCricketIcon sx={{ color: 'secondary.main', fontSize: 32, mr: 2 }} />
                <Box>
                  <Typography fontWeight={700}>{file.name}</Typography>
                  {file.shared && (
                    <Typography variant="caption" color="secondary">
                      Shared! Expires: {file.expiresAt}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
                <Tooltip title="Download">
                  <IconButton color="primary" onClick={() => handleDownload(file)}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton color="secondary" onClick={() => handleShare(file)}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {shareLink && (
        <Snackbar
          open={!!shareLink}
          autoHideDuration={3000}
          onClose={() => setShareLink('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="info" sx={{ width: '100%' }}>
            Share link copied! <br />
            <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default DashboardPage; 