import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';
import WindowPreview from '../../components/WindowPreview';
import { WindowConfig } from '../../data/windowConfigurations';

export default function WindowVisualizer() {
  // Default window configuration JSON
  const defaultConfigJson = `{
  "id": "double-horizontal",
  "name": "Double Horizontal (Side-by-Side)",
  "width": 400,
  "height": 300,
  "color": "#f0f0f0",
  "partitions": {
    "horizontal": 0,
    "vertical": 0
  },
  "openingType": "turn",
  "frameLayout": "double-horizontal"
}`;

  // State
  const [jsonInput, setJsonInput] = useState<string>(defaultConfigJson);
  const [config, setConfig] = useState<WindowConfig | null>(null);
  // Ref to track current layout type directly
  const currentLayoutRef = useRef<string | null>(null);
  // Force re-render
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  
  // Force update of pane heights when config changes for double-vertical-small-top
  useEffect(() => {
    if (config) {
      currentLayoutRef.current = config.frameLayout as string;
      if (currentLayoutRef.current === 'double-vertical-small-top') {
        const topHeight = Math.round(config.height / 3); // 1/3 of total height
        const bottomHeight = config.height - topHeight; // 2/3 of total height
        setPaneHeights([topHeight, bottomHeight]);
        // Force a re-render to update input fields
        forceUpdate();
      }
    }
  }, [config]);

  const [error, setError] = useState<string | null>(null);
  const [paneWidths, setPaneWidths] = useState<number[]>([]);
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const [paneHeights, setPaneHeights] = useState<number[]>([]);
  const [totalHeight, setTotalHeight] = useState<number>(0);
  // No longer using tabs as width and height will be shown together

  // Handle JSON input change
  const handleJsonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJsonInput(event.target.value);
  };

  // Helper functions to get the top and bottom pane heights for double-vertical-small-top layout
  const getTopHeightValue = () => {
    try {
      if (config?.frameLayout === 'double-vertical-small-top' && paneHeights && paneHeights.length > 0) {
        return paneHeights[0] || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error in getTopHeightValue:', error);
      return 0;
    }
  };

  const getBottomHeightValue = () => {
    try {
      if (config?.frameLayout === 'double-vertical-small-top' && paneHeights && paneHeights.length > 1) {
        return paneHeights[1] || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error in getBottomHeightValue:', error);
      return 0;
    }
  };

  // Visualize the window based on the JSON input
  const visualizeWindow = () => {
    try {
      const parsedConfig = JSON.parse(jsonInput) as WindowConfig;
      setConfig(parsedConfig);
      setError(null);

      // Store the initial total width and height
      setTotalWidth(parsedConfig.width);
      setTotalHeight(parsedConfig.height);

      // Initialize pane widths based on layout
      if (parsedConfig.frameLayout === 'single') {
        setPaneWidths([parsedConfig.width]);
        setPaneHeights([parsedConfig.height]);
      } else if (parsedConfig.frameLayout === 'double-horizontal') {
        setPaneWidths([Math.round(parsedConfig.width / 2), Math.round(parsedConfig.width / 2)]);
        setPaneHeights([parsedConfig.height, parsedConfig.height]); // Same height for both panes
      } else if (parsedConfig.frameLayout === 'triple-horizontal') {
        setPaneWidths([
          Math.round(parsedConfig.width / 3),
          Math.round(parsedConfig.width / 3),
          Math.round(parsedConfig.width / 3),
        ]);
        setPaneHeights([parsedConfig.height, parsedConfig.height, parsedConfig.height]); // Same height for all panes
      } else if (
        parsedConfig.frameLayout === 'double-vertical' ||
        parsedConfig.frameLayout === 'double-vertical-reversed'
      ) {
        setPaneWidths([parsedConfig.width]); // Same width for both panes
        setPaneHeights([Math.round(parsedConfig.height / 2), Math.round(parsedConfig.height / 2)]);
      } else if (parsedConfig.frameLayout === 'double-vertical-small-top') {
        // Double-vertical with small top pane (1/3) and large bottom pane (2/3)
        setPaneWidths([parsedConfig.width]); // Same width for both panes
        // Default to 1/3 for top and 2/3 for bottom as specified
        const topHeight = Math.round(parsedConfig.height / 3); // 1/3 of total height
        const bottomHeight = parsedConfig.height - topHeight; // 2/3 of total height
        console.log('SETTING DOUBLE-VERTICAL-SMALL-TOP HEIGHTS:', { topHeight, bottomHeight, totalHeight: parsedConfig.height });
        setPaneHeights([topHeight, bottomHeight]);
        // Force a small timeout to ensure the state is properly updated
        setTimeout(() => {
          console.log('ACTUAL PANE HEIGHTS AFTER TIMEOUT:', paneHeights);
        }, 100);
      } else if (parsedConfig.frameLayout === 't-layout') {
        // T-Layout: top pane with two bottom panes
        const topWidth = parsedConfig.width;
        const bottomWidth = Math.round(parsedConfig.width / 2);

        // Top height is 40% of total height, bottom is 60%
        const topHeight = Math.round(parsedConfig.height * 0.4);
        const bottomHeight = Math.round(parsedConfig.height * 0.6);

        setPaneWidths([topWidth, bottomWidth, bottomWidth]);
        setPaneHeights([topHeight, bottomHeight, bottomHeight]);
      } else if (parsedConfig.frameLayout === 'double-top') {
        // Double-top: two panes on top, one on bottom
        const topWidth = Math.round(parsedConfig.width / 2);
        const bottomWidth = parsedConfig.width;

        // Top height is 40% of total height, bottom is 60%
        const topHeight = Math.round(parsedConfig.height * 0.4);
        const bottomHeight = Math.round(parsedConfig.height * 0.6);

        setPaneWidths([topWidth, topWidth, bottomWidth]);
        setPaneHeights([topHeight, topHeight, bottomHeight]);
      } else if (parsedConfig.frameLayout === 'top-transom') {
        // Top transom: small top pane with three equal panes below
        // For width: all panes have equal width
        const paneWidth = Math.round(parsedConfig.width / 3);

        // For height: top transom is 20%, other panes share 80%
        const transomHeight = Math.round(parsedConfig.height * 0.2);
        const mainHeight = Math.round(parsedConfig.height * 0.8);

        setPaneWidths([parsedConfig.width, paneWidth, paneWidth, paneWidth]);
        setPaneHeights([transomHeight, mainHeight / 3, mainHeight / 3, mainHeight / 3]);
      } else if (parsedConfig.frameLayout === 'bottom-transom') {
        // Bottom transom: three equal panes on top with small bottom pane
        // For width: all panes have equal width
        const paneWidth = Math.round(parsedConfig.width / 3);
        const bottomWidth = parsedConfig.width;

        // For height: bottom transom is 20%, other panes share 80%
        const mainHeight = Math.round(parsedConfig.height * 0.8);
        const transomHeight = Math.round(parsedConfig.height * 0.2);

        setPaneWidths([paneWidth, paneWidth, paneWidth, bottomWidth]);
        setPaneHeights([mainHeight / 3, mainHeight / 3, mainHeight / 3, transomHeight]);
      } else {
        // Default fallback for other layouts
        setPaneWidths([parsedConfig.width]);
        setPaneHeights([parsedConfig.height]);
      }
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
      setConfig(null);
    }
  };

  // Update the config whenever pane widths change
  useEffect(() => {
    if (config && paneWidths.length > 0) {
      const calculatedWidth = paneWidths.reduce((sum, width) => sum + width, 0);
      setConfig({ ...config, width: calculatedWidth });
    }
  }, [paneWidths]);

  // Reset to default
  const resetToDefault = () => {
    setJsonInput(defaultConfigJson);
    setConfig(null);
    setError(null);
    setPaneWidths([]);
    setTotalWidth(0);
    setPaneHeights([]);
    setTotalHeight(0);
  };

  // Handle width change for single pane layout
  const handleSinglePaneWidthChange = (newWidth: number) => {
    // For single pane, just update the width directly
    setPaneWidths([newWidth]);

    // Update config width for Preview SVG
    if (config) {
      const updatedConfig = { ...config, width: newWidth };
      setConfig(updatedConfig);
      setJsonInput(JSON.stringify(updatedConfig, null, 2));
    }

    // Update total width state
    setTotalWidth(newWidth);
  };

  // Handle width change for double-horizontal layout
  const handleDoubleHorizontalWidthChange = (index: number, newWidth: number) => {
    const oldWidth = paneWidths[index] || 0;
    const difference = newWidth - oldWidth;

    // Create a new array with updated widths
    const newPaneWidths = [...paneWidths];
    newPaneWidths[index] = newWidth;

    // Determine which pane to adjust (the other one)
    const otherPaneIndex = index === 0 ? 1 : 0;

    // Adjust the other pane width to maintain total width
    // Make sure it doesn't go below minimum width (10mm)
    newPaneWidths[otherPaneIndex] = Math.max(10, (paneWidths[otherPaneIndex] || 0) - difference);

    setPaneWidths(newPaneWidths);

    // Calculate total width for config update
    const totalWidth = newPaneWidths.reduce((sum, width) => sum + (width || 0), 0);

    // Update config width for Preview SVG with proportion information
    if (config) {
      // Calculate the proportion of the first pane to the total width
      const pane1Proportion = newPaneWidths[0] / totalWidth;

      const updatedConfig = {
        ...config,
        width: totalWidth,
        partitions: {
          ...config.partitions,
          horizontal: config.partitions?.horizontal || 0,
          vertical: pane1Proportion,
        },
      };

      setConfig(updatedConfig);
      setJsonInput(JSON.stringify(updatedConfig, null, 2));
    }

    // Update total width state
    setTotalWidth(totalWidth);
  };

  // Handle width change for triple-horizontal layout
  const handleTripleHorizontalWidthChange = (index: number, newWidth: number) => {
    const oldWidth = paneWidths[index] || 0;
    const difference = newWidth - oldWidth;

    const newPaneWidths = [...paneWidths];
    newPaneWidths[index] = newWidth;

    // Get indices of the other two panes
    const otherIndices = [0, 1, 2].filter((i) => i !== index);

    // Calculate total width of other panes
    const otherPanesTotal = otherIndices.reduce((sum, i) => sum + (paneWidths[i] || 0), 0);

    if (otherPanesTotal > 0) {
      // Distribute the difference proportionally between the other two panes
      otherIndices.forEach((i) => {
        const ratio = (paneWidths[i] || 0) / otherPanesTotal;
        newPaneWidths[i] = Math.max(10, (paneWidths[i] || 0) - difference * ratio);
      });
    }

    setPaneWidths(newPaneWidths);

    // Calculate total width for config update
    const totalWidth = newPaneWidths.reduce((sum, width) => sum + (width || 0), 0);

    // Update config width for Preview SVG with proportion information
    if (config) {
      // Calculate proportions for dividers
      const pane1Proportion = newPaneWidths[0] / totalWidth;
      const pane2Proportion = (newPaneWidths[0] + newPaneWidths[1]) / totalWidth;

      const updatedConfig = {
        ...config,
        width: totalWidth,
        partitions: {
          ...config.partitions,
          horizontal: config.partitions?.horizontal || 0,
          // Store first and second divider positions as proportions
          vertical: pane1Proportion,
          vertical2: pane2Proportion,
        },
      };

      setConfig(updatedConfig);
      setJsonInput(JSON.stringify(updatedConfig, null, 2));
    }

    // Update total width state
    setTotalWidth(totalWidth);
  };

  // Handle height change for all layouts
  const handleHeightChange = (newHeight: number) => {
    // Update the total height
    setTotalHeight(newHeight);

    // Update config height
    if (config) {
      const updatedConfig = { ...config, height: newHeight };
      setConfig(updatedConfig);
      setJsonInput(JSON.stringify(updatedConfig, null, 2));
    }

    // Update pane heights based on layout
    if (config?.frameLayout === 'single') {
      setPaneHeights([newHeight]);
    } else if (
      config?.frameLayout === 'double-horizontal' ||
      config?.frameLayout === 'triple-horizontal'
    ) {
      // For horizontal layouts, all panes have the same height
      const newPaneHeights = paneHeights.map(() => newHeight);
      setPaneHeights(newPaneHeights);
    } else if (
      config?.frameLayout === 'double-vertical' ||
      config?.frameLayout === 'double-vertical-reversed'
    ) {
      // For double vertical, maintain the ratio of pane heights
      const totalOldHeight = paneHeights.reduce((sum, h) => sum + (h || 0), 0);
      if (totalOldHeight > 0) {
        const ratio = newHeight / totalOldHeight;
        const newPaneHeights = paneHeights.map((h) => Math.max(10, Math.round((h || 0) * ratio)));
        setPaneHeights(newPaneHeights);
      } else {
        // If total height is 0, divide evenly
        setPaneHeights([Math.round(newHeight / 2), Math.round(newHeight / 2)]);
      }
    } else if (config?.frameLayout === 'double-vertical-small-top') {
      // For double-vertical-small-top, maintain the fixed top size of 360mm
      const topHeight = 360; // Fixed 360mm for top pane as shown in the example image
      const bottomHeight = Math.max(10, newHeight - topHeight);
      setPaneHeights([topHeight, bottomHeight]);
    } else if (config?.frameLayout === 't-layout') {
      // For T-layout, maintain the ratio of pane heights
      const totalOldHeight = paneHeights.reduce((sum, h) => sum + (h || 0), 0);
      if (totalOldHeight > 0) {
        const ratio = newHeight / totalOldHeight;
        const newPaneHeights = paneHeights.map((h) => Math.max(10, Math.round((h || 0) * ratio)));
        setPaneHeights(newPaneHeights);
      } else {
        // If total height is 0, use default distribution
        const topHeight = Math.round(newHeight * 0.4);
        const bottomHeight = Math.round(newHeight * 0.6);
        setPaneHeights([topHeight, bottomHeight, bottomHeight]);
      }
    } else {
      // For all other layouts, maintain the ratio of pane heights
      const totalOldHeight = paneHeights.reduce((sum, h) => sum + (h || 0), 0);
      if (totalOldHeight > 0) {
        const ratio = newHeight / totalOldHeight;
        const newPaneHeights = paneHeights.map((h) => Math.max(10, Math.round((h || 0) * ratio)));
        setPaneHeights(newPaneHeights);
      } else {
        // If total height is 0, divide evenly
        setPaneHeights(paneHeights.map(() => Math.round(newHeight / paneHeights.length)));
      }
    }
  };

  // Handle T-Layout top pane height change
  const handleTLayoutTopHeightChange = (newHeight: number) => {
    // Ensure bottom height doesn't go below minimum
    const currentBottom = paneHeights[1] || 0;
    const totalNewHeight = newHeight + currentBottom;

    // Update pane heights
    setPaneHeights([newHeight, currentBottom, currentBottom]);
    setTotalHeight(totalNewHeight);

    // Update config height and proportion
    if (config) {
      const proportion = newHeight / totalNewHeight;
      const updatedConfig = {
        ...config,
        height: totalNewHeight,
        partitions: {
          ...config.partitions,
          horizontal: proportion,
          vertical: config.partitions?.vertical || 0.5,
        },
      };
      setConfig(updatedConfig);
      setJsonInput(JSON.stringify(updatedConfig, null, 2));
    }
  };

  // Handle T-Layout bottom panes height change
  const handleTLayoutBottomHeightChange = (newHeight: number) => {
    // Ensure top height doesn't go below minimum
    const currentTop = paneHeights[0] || 0;
    const totalNewHeight = currentTop + newHeight;

    // Update pane heights - both bottom panes get the same height
    setPaneHeights([currentTop, newHeight, newHeight]);
    setTotalHeight(totalNewHeight);

    // Update config height and proportion
    if (config) {
      const proportion = currentTop / totalNewHeight;
      const updatedConfig = {
        ...config,
        height: totalNewHeight,
        partitions: {
          ...config.partitions,
          horizontal: proportion,
          vertical: config.partitions?.vertical || 0.5,
        },
      };
      setConfig(updatedConfig);
      setJsonInput(JSON.stringify(updatedConfig, null, 2));
    }
  };

  // Handle top pane height change for double-vertical-small-top layout
  const handleSmallTopHeightChange = (newTopHeight: number) => {
    // Update the top pane height while maintaining total height
    if (config && config.frameLayout === 'double-vertical-small-top') {
      const currentTotal = totalHeight;
      const bottomHeight = Math.max(10, currentTotal - newTopHeight);
      
      setPaneHeights([newTopHeight, bottomHeight]);
    }
  };
  
  // Handle bottom pane height change for double-vertical-small-top layout
  const handleLargeBottomHeightChange = (newBottomHeight: number) => {
    // Update the bottom pane height while maintaining top pane at 360mm
    if (config && config.frameLayout === 'double-vertical-small-top') {
      const topHeight = 360; // Fixed at 360mm
      const newTotal = topHeight + newBottomHeight;
      
      // Update total height
      setTotalHeight(newTotal);
      
      // Update pane heights
      setPaneHeights([topHeight, newBottomHeight]);
      
      // Update config
      if (config) {
        const updatedConfig = { ...config, height: newTotal };
        setConfig(updatedConfig);
        setJsonInput(JSON.stringify(updatedConfig, null, 2));
      }
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Window Configuration
      </Typography>

      <Grid container spacing={4}>
        {/* Left column - JSON Input */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Edit JSON Configuration:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={15}
                variant="outlined"
                value={jsonInput}
                onChange={handleJsonChange}
                error={!!error}
                helperText={error}
                sx={{
                  fontFamily: 'monospace',
                  '& .MuiOutlinedInput-root': {
                    '& textarea': {
                      fontFamily: 'monospace',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant="outlined" color="secondary" onClick={resetToDefault}>
                  RESET TO DEFAULT
                </Button>
                <Button variant="contained" color="primary" onClick={visualizeWindow}>
                  VISUALIZE WINDOW
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right column - Preview */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preview:
              </Typography>
              {config ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3,
                      bgcolor: '#f9f9f9',
                      borderRadius: 1,
                      minHeight: '300px',
                      mb: 3,
                    }}
                  >
                    <WindowPreview config={config} />
                  </Box>

                  {/* Dimension customization section */}
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#f3f3f3', borderRadius: 1 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                      CLASSIFICATION
                    </Typography>
                    <Typography variant="body2" gutterBottom color="text.secondary">
                      Please make the desired arrangement of your window
                    </Typography>

                    {/* Dimension title */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                      <Typography variant="subtitle2" align="center" sx={{ pb: 1 }}>
                        Width and Height Adjustments
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}
                    >
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          Adjust Dimensions
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Render different width inputs based on frameLayout */}
                        {config.frameLayout === 'single' && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Box
                              sx={{
                                width: '100px',
                                height: '150px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                bgcolor: '#e6f7ff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 2,
                              }}
                            >
                              +
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                              <TextField
                                size="small"
                                type="number"
                                label="Width"
                                value={paneWidths[0] || 0}
                                onChange={(e) => {
                                  const newWidth = Math.max(10, Number(e.target.value));
                                  handleSinglePaneWidthChange(newWidth);
                                }}
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '120px' },
                                }}
                              />
                              <TextField
                                size="small"
                                type="number"
                                label="Height"
                                value={paneHeights[0] || 0}
                                onChange={(e) => {
                                  const newHeight = Math.max(10, Number(e.target.value));
                                  handleHeightChange(newHeight);
                                }}
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '120px' },
                                }}
                              />
                            </Box>
                          </Box>
                        )}

                        {config.frameLayout === 'double-horizontal' && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                              <Box
                                sx={{
                                  width: `${Math.max(
                                    30,
                                    160 * (paneWidths[0] / (paneWidths[0] + paneWidths[1] || 1))
                                  )}px`,
                                  height: `${Math.min(totalHeight / 4, 100)}px`,
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  bgcolor: '#e6f7ff',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  mr: 1,
                                }}
                              >
                                +
                              </Box>
                              <Box
                                sx={{
                                  width: `${Math.max(
                                    30,
                                    160 * (paneWidths[1] / (paneWidths[0] + paneWidths[1] || 1))
                                  )}px`,
                                  height: `${Math.min(totalHeight / 4, 100)}px`,
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  bgcolor: '#e6f7ff',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  ml: 1,
                                }}
                              >
                                +
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '100%',
                                flexWrap: 'wrap',
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  mb: 2,
                                }}
                              >
                                <Typography variant="caption" gutterBottom>
                                  Left Pane
                                </Typography>
                                <TextField
                                  size="small"
                                  type="number"
                                  label="Width"
                                  value={paneWidths[0] || 0}
                                  onChange={(e) => {
                                    const newWidth = Math.max(10, Number(e.target.value));
                                    handleDoubleHorizontalWidthChange(0, newWidth);
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '120px', mb: 1 },
                                  }}
                                />
                                <TextField
                                  size="small"
                                  type="number"
                                  label="Height"
                                  value={paneHeights[0] || 0}
                                  onChange={(e) => {
                                    const newHeight = Math.max(10, Number(e.target.value));
                                    handleHeightChange(newHeight);
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '120px' },
                                  }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  mb: 2,
                                }}
                              >
                                <Typography variant="caption" gutterBottom>
                                  Right Pane
                                </Typography>
                                <TextField
                                  size="small"
                                  type="number"
                                  label="Width"
                                  value={paneWidths[1] || 0}
                                  onChange={(e) => {
                                    const newWidth = Math.max(10, Number(e.target.value));
                                    handleDoubleHorizontalWidthChange(1, newWidth);
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '120px', mb: 1 },
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{ mt: 3, width: '100%', maxWidth: '250px', textAlign: 'center' }}
                            >
                              <TextField
                                size="small"
                                type="number"
                                value={paneWidths.reduce((sum, width) => sum + width, 0)}
                                label="Total Width"
                                variant="outlined"
                                disabled
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '150px' },
                                }}
                              />
                            </Box>
                          </Box>
                        )}

                        {config.frameLayout === 'triple-horizontal' && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                              <Box
                                sx={{
                                  width: `${Math.max(
                                    30,
                                    160 *
                                      (paneWidths[0] /
                                        (paneWidths[0] + paneWidths[1] + paneWidths[2] || 1))
                                  )}px`,
                                  height: `${Math.min(totalHeight / 4, 100)}px`,
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  bgcolor: '#e6f7ff',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  mx: 0.5,
                                }}
                              >
                                +
                              </Box>
                              <Box
                                sx={{
                                  width: `${Math.max(
                                    30,
                                    160 *
                                      (paneWidths[1] /
                                        (paneWidths[0] + paneWidths[1] + paneWidths[2] || 1))
                                  )}px`,
                                  height: `${Math.min(totalHeight / 4, 100)}px`,
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  bgcolor: '#e6f7ff',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  mx: 0.5,
                                }}
                              >
                                +
                              </Box>
                              <Box
                                sx={{
                                  width: `${Math.max(
                                    30,
                                    160 *
                                      (paneWidths[2] /
                                        (paneWidths[0] + paneWidths[1] + paneWidths[2] || 1))
                                  )}px`,
                                  height: `${Math.min(totalHeight / 4, 100)}px`,
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  bgcolor: '#e6f7ff',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  mx: 0.5,
                                }}
                              >
                                +
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '100%',
                                maxWidth: '300px',
                                flexWrap: 'wrap',
                              }}
                            >
                              <TextField
                                size="small"
                                type="number"
                                value={paneWidths[0] || 0}
                                onChange={(e) => {
                                  const newWidth = Math.max(10, Number(e.target.value));
                                  handleTripleHorizontalWidthChange(0, newWidth);
                                }}
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '90px', m: 0.5 },
                                }}
                              />
                              <TextField
                                size="small"
                                type="number"
                                value={paneWidths[1] || 0}
                                onChange={(e) => {
                                  const newWidth = Math.max(10, Number(e.target.value));
                                  handleTripleHorizontalWidthChange(1, newWidth);
                                }}
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '90px', m: 0.5 },
                                }}
                              />
                              <TextField
                                size="small"
                                type="number"
                                value={paneWidths[2] || 0}
                                onChange={(e) => {
                                  const newWidth = Math.max(10, Number(e.target.value));
                                  handleTripleHorizontalWidthChange(2, newWidth);
                                }}
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '90px', m: 0.5 },
                                }}
                              />
                            </Box>
                            <Box
                              sx={{ mt: 3, width: '100%', maxWidth: '250px', textAlign: 'center' }}
                            >
                              <TextField
                                size="small"
                                type="number"
                                value={paneWidths.reduce((sum, width) => sum + width, 0)}
                                label="Total Width"
                                variant="outlined"
                                disabled
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '150px' },
                                }}
                              />
                            </Box>
                          </Box>
                        )}

                        {/* For other layouts, add more conditions and UI elements */}
                        {/* T-Layout Width */}
                        {config.frameLayout === 't-layout' && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                mb: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  width: '150px',
                                  height: '60px',
                                  bgcolor: '#e0e0e0',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  border: '1px solid #bbb',
                                  borderRadius: '4px 4px 0 0',
                                }}
                              >
                                <Typography>Top</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', width: '150px' }}>
                                <Box
                                  sx={{
                                    width: '75px',
                                    height: '80px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderTop: 'none',
                                    borderRight: 'none',
                                    borderRadius: '0 0 0 4px',
                                  }}
                                >
                                  <Typography>BL</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    width: '75px',
                                    height: '80px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderTop: 'none',
                                    borderRadius: '0 0 4px 0',
                                  }}
                                >
                                  <Typography>BR</Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                              }}
                            >
                              <TextField
                                size="small"
                                type="number"
                                value={paneWidths[0] || 0}
                                label="Top Width"
                                onChange={(e) => {
                                  const newWidth = Math.max(10, Number(e.target.value));
                                  // Update width logic for T-Layout
                                  const difference = newWidth - (paneWidths[0] || 0);
                                  const newPaneWidths = [...paneWidths];
                                  newPaneWidths[0] = newWidth;
                                  setPaneWidths(newPaneWidths);
                                }}
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '150px', m: 0.5 },
                                }}
                              />
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  maxWidth: '340px',
                                  mt: 1,
                                }}
                              >
                                <TextField
                                  size="small"
                                  type="number"
                                  value={paneWidths[1] || 0}
                                  label="Bottom Left"
                                  onChange={(e) => {
                                    const newWidth = Math.max(10, Number(e.target.value));
                                    // Update width logic for T-Layout bottom left
                                    const oldWidth = paneWidths[1] || 0;
                                    const difference = newWidth - oldWidth;

                                    const newPaneWidths = [...paneWidths];
                                    newPaneWidths[1] = newWidth;
                                    // Adjust right bottom pane to maintain total width
                                    newPaneWidths[2] = Math.max(
                                      10,
                                      (paneWidths[2] || 0) - difference
                                    );

                                    setPaneWidths(newPaneWidths);
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px', m: 0.5 },
                                  }}
                                />
                                <TextField
                                  size="small"
                                  type="number"
                                  value={paneWidths[2] || 0}
                                  label="Bottom Right"
                                  onChange={(e) => {
                                    const newWidth = Math.max(10, Number(e.target.value));
                                    // Update width logic for T-Layout bottom right
                                    const oldWidth = paneWidths[2] || 0;
                                    const difference = newWidth - oldWidth;

                                    const newPaneWidths = [...paneWidths];
                                    newPaneWidths[2] = newWidth;
                                    // Adjust left bottom pane to maintain total width
                                    newPaneWidths[1] = Math.max(
                                      10,
                                      (paneWidths[1] || 0) - difference
                                    );

                                    setPaneWidths(newPaneWidths);
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px', m: 0.5 },
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
                              <TextField
                                size="small"
                                type="number"
                                value={totalWidth}
                                label="Total Width"
                                variant="outlined"
                                disabled
                                InputProps={{
                                  endAdornment: <Typography variant="caption">mm</Typography>,
                                  sx: { width: '150px' },
                                }}
                              />
                            </Box>
                          </Box>
                        )}

                        {/* For other layouts that aren't explicitly handled */}
                        {![
                          'single',
                          'double-horizontal',
                          'triple-horizontal',
                          'double-vertical',
                          'double-vertical-reversed',
                          't-layout',
                        ].includes(config.frameLayout) && (
                          <Typography>
                            Width controls for {config.frameLayout} layout will be implemented soon.
                          </Typography>
                        )}
                      </Box>

                      {/* HEIGHT SECTION - Single unified height input for all layouts */}
                      {config && (
                        <Box>
                          <Divider sx={{ mb: 2 }} />

                          {/* Double Horizontal Height Visualization */}
                          {config && config.frameLayout === 'double-horizontal' && (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                mb: 2,
                              }}
                            >
                              {/* SVG preview */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <Box
                                  sx={{
                                    width: Math.max(40, (paneWidths[0] / (totalWidth || 1)) * 180) + 'px',
                                    height: '80px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderRight: 'none',
                                    borderRadius: '4px 0 0 4px',
                                  }}
                                >
                                  <Typography>Left</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    width: Math.max(40, (paneWidths[1] / (totalWidth || 1)) * 180) + 'px',
                                    height: '80px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderRadius: '0 4px 4px 0',
                                  }}
                                >
                                  <Typography>Right</Typography>
                                </Box>
                              </Box>
                              
                              {/* Input fields */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 2,
                                }}
                              >
                                <TextField
                                  size="small"
                                  type="number"
                                  value={paneWidths[0] || 0}
                                  label="Left Width"
                                  onChange={(e) => {
                                    console.log('Left Width changing to:', e.target.value);
                                    const newLeftWidth = Math.max(10, Number(e.target.value));
                                    // For double-horizontal, adjust right pane width to maintain total width
                                    const newRightWidth = Math.max(10, totalWidth - newLeftWidth);
                                    console.log('Setting pane widths to:', [newLeftWidth, newRightWidth]);
                                    setPaneWidths([newLeftWidth, newRightWidth]);
                                  }}
                                  InputProps={{
                                    inputProps: { min: 10 },
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px' },
                                  }}
                                />
                                <TextField
                                  key={`right-width-${totalWidth}`}
                                  size="small"
                                  type="number"
                                  value={paneWidths[1] || 0}
                                  label="Right Width"
                                  onChange={(e) => {
                                    console.log('Right Width changing to:', e.target.value);
                                    const newRightWidth = Math.max(10, Number(e.target.value));
                                    // For double-horizontal, adjust left pane width to maintain total width
                                    const newLeftWidth = Math.max(10, totalWidth - newRightWidth);
                                    console.log('Setting pane widths to:', [newLeftWidth, newRightWidth]);
                                    setPaneWidths([newLeftWidth, newRightWidth]);
                                  }}
                                  InputProps={{
                                    inputProps: { min: 10 },
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px' },
                                  }}
                                />
                              </Box>
                            </Box>
                          )}
                          
                          {/* Double Vertical Height Visualization */}
                          {config &&
                            ['double-vertical', 'double-vertical-reversed'].includes(
                              config.frameLayout
                            ) && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  mb: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: '80px',
                                    height:
                                      Math.max(40, (paneHeights[0] / (totalHeight || 1)) * 180) +
                                      'px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderBottom: 'none',
                                    borderRadius: '4px 4px 0 0',
                                  }}
                                >
                                  <Typography>Top</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    width: '80px',
                                    height:
                                      Math.max(40, (paneHeights[1] / (totalHeight || 1)) * 180) +
                                      'px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderRadius: '0 0 4px 4px',
                                  }}
                                >
                                  <Typography>Bottom</Typography>
                                </Box>
                              </Box>
                            )}
                            
                          {/* Double Vertical Small Top Height Visualization */}
                          {config && config.frameLayout === 'double-vertical-small-top' && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  mb: 2,
                                }}
                              >
                                {/* SVG preview */}
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: '80px',
                                      height: Math.max(40, (getTopHeightValue() / (totalHeight || 1)) * 180) + 'px',
                                      bgcolor: '#e0e0e0',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #bbb',
                                      borderBottom: 'none',
                                      borderRadius: '4px 4px 0 0',
                                    }}
                                  >
                                    <Typography>Top</Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      width: '80px',
                                      height: Math.max(40, (getBottomHeightValue() / (totalHeight || 1)) * 180) + 'px',
                                      bgcolor: '#e0e0e0',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #bbb',
                                      borderRadius: '0 0 4px 4px',
                                    }}
                                  >
                                    <Typography>Bottom</Typography>
                                  </Box>
                                </Box>
                                
                                {/* Input fields */}
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                  }}
                                >
                                  <TextField
                                    key={`top-height-${totalHeight}`}
                                    size="small"
                                    type="number"
                                    value={paneHeights[0] || 0}
                                    label="Top Height"
                                    onChange={(e) => {
                                      console.log('Top Height changing to:', e.target.value);
                                      const newTopHeight = Math.max(10, Number(e.target.value));
                                      if (config?.frameLayout === 'double-vertical-small-top') {
                                        // For double-vertical-small-top, adjust bottom pane height to maintain total height
                                        const newBottomHeight = Math.max(10, totalHeight - newTopHeight);
                                        console.log('Setting pane heights to:', [newTopHeight, newBottomHeight]);
                                        setPaneHeights([newTopHeight, newBottomHeight]);
                                      }
                                    }}
                                    InputProps={{
                                      inputProps: { min: 10 },
                                      endAdornment: <Typography variant="caption">mm</Typography>,
                                      sx: { width: '150px' },
                                    }}
                                  />
                                  <TextField
                                    key={`bottom-height-${totalHeight}`}
                                    size="small"
                                    type="number"
                                    value={paneHeights[1] || 0}
                                    label="Bottom Height"
                                    onChange={(e) => {
                                      console.log('Bottom Height changing to:', e.target.value);
                                      const newBottomHeight = Math.max(10, Number(e.target.value));
                                      if (config?.frameLayout === 'double-vertical-small-top') {
                                        // For double-vertical-small-top, adjust top pane height to maintain total height
                                        const newTopHeight = Math.max(10, totalHeight - newBottomHeight);
                                        console.log('Setting pane heights to:', [newTopHeight, newBottomHeight]);
                                        setPaneHeights([newTopHeight, newBottomHeight]);
                                      }
                                    }}
                                    InputProps={{
                                      inputProps: { min: 10 },
                                      endAdornment: <Typography variant="caption">mm</Typography>,
                                      sx: { width: '150px' },
                                    }}
                                  />
                                </Box>
                              </Box>
                            )}

                          {/* T-Layout Height */}
                          {config.frameLayout === 't-layout' && (
                            <Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  mb: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: '150px',
                                    height:
                                      Math.max(40, (paneHeights[0] / (totalHeight || 1)) * 180) +
                                      'px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderRadius: '4px 4px 0 0',
                                    mb: 1,
                                  }}
                                >
                                  <Typography>Top</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', width: '150px' }}>
                                  <Box
                                    sx={{
                                      width: '75px',
                                      height:
                                        Math.max(40, (paneHeights[1] / (totalHeight || 1)) * 180) +
                                        'px',
                                      bgcolor: '#e0e0e0',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #bbb',
                                      borderRight: 'none',
                                      borderRadius: '0 0 0 4px',
                                    }}
                                  >
                                    <Typography>BL</Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      width: '75px',
                                      height:
                                        Math.max(40, (paneHeights[2] / (totalHeight || 1)) * 180) +
                                        'px',
                                      bgcolor: '#e0e0e0',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #bbb',
                                      borderRadius: '0 0 4px 0',
                                    }}
                                  >
                                    <Typography>BR</Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                <Typography variant="caption" sx={{ mb: 1 }}>
                                  Top & Bottom Heights
                                </Typography>
                                <Box
                                  sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                                >
                                  <TextField
                                    size="small"
                                    type="number"
                                    label="Top Height"
                                    value={paneHeights[0] || 0}
                                    onChange={(e) => {
                                      const newHeight = Math.max(10, Number(e.target.value));
                                      handleTLayoutTopHeightChange(newHeight);
                                    }}
                                    InputProps={{
                                      endAdornment: <Typography variant="caption">mm</Typography>,
                                      sx: { width: '130px' },
                                    }}
                                  />
                                  <TextField
                                    size="small"
                                    type="number"
                                    label="Bottom Height"
                                    value={paneHeights[1] || 0}
                                    onChange={(e) => {
                                      const newHeight = Math.max(10, Number(e.target.value));
                                      handleTLayoutBottomHeightChange(newHeight);
                                    }}
                                    InputProps={{
                                      endAdornment: <Typography variant="caption">mm</Typography>,
                                      sx: { width: '130px', ml: 1 },
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          )}

                          {/* Double-Vertical Height (For Small Top) */}
                          {config.frameLayout === 'double-vertical' && (
                            <Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  mb: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: '80px',
                                    height:
                                      Math.max(40, (paneHeights[0] / (totalHeight || 1)) * 180) +
                                      'px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderBottom: 'none',
                                    borderRadius: '4px 4px 0 0',
                                  }}
                                >
                                  <Typography>Top</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    width: '80px',
                                    height:
                                      Math.max(40, (paneHeights[1] / (totalHeight || 1)) * 180) +
                                      'px',
                                    bgcolor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #bbb',
                                    borderRadius: '0 0 4px 4px',
                                  }}
                                >
                                  <Typography>Bottom</Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                {/* For double-vertical-small-top, we need special handling */}
                                <TextField
                                  size="small"
                                  type="number"
                                  key={config && (config.frameLayout as string) === 'double-vertical-small-top' ? 'small-top-pane-' + totalHeight : 'normal-top-pane'}
                                  value={getTopHeightValue()}
                                  label="Top Height"
                                  onChange={(e) => {
                                    const newHeight = Math.max(10, Number(e.target.value));
                                    if (config && (config.frameLayout as string) === 'double-vertical-small-top') {
                                      handleSmallTopHeightChange(newHeight);
                                    } else {
                                      handleHeightChange(newHeight);
                                    }
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px', m: 0.5 },
                                  }}
                                />
                                <TextField
                                  size="small"
                                  type="number"
                                  key={config && (config.frameLayout as string) === 'double-vertical-small-top' ? 'small-bottom-pane-' + totalHeight : 'normal-bottom-pane'}
                                  value={getBottomHeightValue()}
                                  label="Bottom Height"
                                  onChange={(e) => {
                                    const newHeight = Math.max(10, Number(e.target.value));
                                    if (config && (config.frameLayout as string) === 'double-vertical-small-top') {
                                      handleLargeBottomHeightChange(newHeight);
                                    } else {
                                      handleHeightChange(newHeight);
                                    }
                                  }}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px', m: 0.5 },
                                  }}
                                />
                              </Box>
                              <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
                                <TextField
                                  size="small"
                                  type="number"
                                  value={totalHeight}
                                  label="Total Height"
                                  variant="outlined"
                                  disabled
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mm</Typography>,
                                    sx: { width: '150px' },
                                  }}
                                />
                              </Box>
                            </Box>
                          )}

                          {/* Window visualization based on layout */}
                          {config &&
                            ![
                              'single',
                              'double-horizontal',
                              'double-vertical',
                              'double-vertical-reversed',
                              't-layout',
                              'double-vertical-small-top',
                              'double-vertical-small-bottom',
                              'double-top',
                              'top-transom',
                              'bottom-transom',
                              'triple-horizontal',
                            ].includes(config.frameLayout) && (
                              <Typography>
                                Height controls for {config.frameLayout} layout will be implemented
                                soon.
                              </Typography>
                            )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    bgcolor: '#f9f9f9',
                    borderRadius: 1,
                    minHeight: '300px',
                  }}
                >
                  <Typography color="text.secondary">
                    Click "VISUALIZE WINDOW" to see the preview
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}