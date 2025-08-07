import { Box } from '@mui/material';
import {
  WindowCustomization,
  WindowStyle,
  WindowOpeningType,
  WindowMaterial,
} from '../../types/window-types';

// WindowCross component for rendering the cross inside window panes
export const WindowCross = () => (
  <Box sx={{ position: 'relative', width: '100%', height: '100%', zIndex: 3 }}>
    {/* Horizontal line - thinner and more subtle */}
    <Box
      sx={{
        position: 'absolute',
        width: '96%',
        height: '1px',
        background:
          'linear-gradient(90deg, rgba(200,200,200,0.2) 0%, rgba(150,150,150,0.5) 50%, rgba(200,200,200,0.2) 100%)',
        top: '50%',
        left: '2%',
        transform: 'translateY(-50%)',
        opacity: 0.6,
        boxShadow: '0 0 2px rgba(255,255,255,0.6)',
      }}
    />
    {/* Glass reflection along horizontal line */}
    <Box
      sx={{
        position: 'absolute',
        width: '96%',
        height: '1px',
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 100%)',
        top: 'calc(50% + 1px)',
        left: '2%',
        transform: 'translateY(-50%)',
        opacity: 0.5,
      }}
    />
    {/* Vertical line - thinner and more subtle */}
    <Box
      sx={{
        position: 'absolute',
        width: '1px',
        height: '96%',
        background:
          'linear-gradient(180deg, rgba(200,200,200,0.2) 0%, rgba(150,150,150,0.5) 50%, rgba(200,200,200,0.2) 100%)',
        left: '50%',
        top: '2%',
        transform: 'translateX(-50%)',
        opacity: 0.6,
        boxShadow: '0 0 2px rgba(255,255,255,0.6)',
      }}
    />
    {/* Glass reflection along vertical line */}
    <Box
      sx={{
        position: 'absolute',
        width: '1px',
        height: '96%',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 100%)',
        left: 'calc(50% + 1px)',
        top: '2%',
        transform: 'translateX(-50%)',
        opacity: 0.5,
      }}
    />
  </Box>
);

// WindowStyle component for rendering different window style visual elements
export const WindowStyleElement = ({
  style,
  openingType,
}: {
  style: WindowStyle;
  openingType?: WindowOpeningType;
}) => {
  // Sliding window style indicator (horizontal handle)
  if (style === WindowStyle.SLIDING) {
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '40%',
            height: '4px',
            backgroundColor: '#666',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </Box>
    );
  }

  // Casement window style indicator (side handle with three dots)
  if (style === WindowStyle.CASEMENT) {
    return (
      <Box
        sx={{
          position: 'absolute',
          right: '5%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {/* Small dot on top */}
        <Box
          sx={{
            width: '4px',
            height: '4px',
            backgroundColor: '#000',
            borderRadius: '50%',
          }}
        />
        {/* Main (larger) dot in middle */}
        <Box
          sx={{
            width: '8px',
            height: '8px',
            backgroundColor: '#000',
            borderRadius: '50%',
            boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
          }}
        />
        {/* Small dot on bottom */}
        <Box
          sx={{
            width: '4px',
            height: '4px',
            backgroundColor: '#000',
            borderRadius: '50%',
          }}
        />
      </Box>
    );
  }

  // Double hung window style indicator (horizontal bar in middle)
  if (style === WindowStyle.DOUBLE_HUNG) {
    return (
      <Box sx={{ position: 'absolute', top: '50%', width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '10px',
            backgroundColor: '#666',
            transform: 'translateY(-50%)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        />
      </Box>
    );
  }

  // Default - no special indicator
  return null;
};

// WindowOpening component for rendering opening indicators based on opening type
export const WindowOpeningIndicator = ({
  openingType,
  position,
}: {
  openingType?: WindowOpeningType;
  position: 'left' | 'right' | 'single';
}) => {
  if (!openingType) return null;

  // Fixed windows have no indicators
  if (openingType === WindowOpeningType.FIXED) return null;

  // If position is 'single', treat it as 'right' for opening indicators
  const effectivePosition = position === 'single' ? 'right' : position;

  // Check if this panel should show an opening indicator
  const shouldShowIndicator =
    (effectivePosition === 'left' &&
      (openingType === WindowOpeningType.LEFT_OPENING ||
        openingType === WindowOpeningType.BOTH_OPENING ||
        openingType === WindowOpeningType.TILT_TURN_LEFT ||
        openingType === WindowOpeningType.TILT_TURN_BOTH)) ||
    (effectivePosition === 'right' &&
      (openingType === WindowOpeningType.RIGHT_OPENING ||
        openingType === WindowOpeningType.BOTH_OPENING ||
        openingType === WindowOpeningType.TILT_TURN_BOTH));

  if (!shouldShowIndicator) return null;

  // Render a more realistic handle/knob to indicate opening direction
  return (
    <Box
      sx={{
        position: 'absolute',
        [effectivePosition === 'left' ? 'left' : 'right']: '5px',
        top: '50%',
        width: '8px',
        height: '14px',
        background: 'linear-gradient(90deg, #555 0%, #888 50%, #666 100%)',
        borderRadius: '4px',
        transform: 'translateY(-50%)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
        border: '0.5px solid rgba(100,100,100,0.8)',
        zIndex: 2,
      }}
    />
  );
};

// WindowPane component for rendering individual window panes with style and opening indicators
export const WindowPane = ({
  style,
  openingType,
  position = 'right',
}: {
  style: WindowStyle;
  openingType?: WindowOpeningType;
  position?: 'left' | 'right' | 'single';
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(135deg, rgba(225,245,255,0.4) 0%, rgba(220,240,255,0.6) 40%, rgba(200,230,255,0.4) 100%)',
        backdropFilter: 'blur(1px)',
        border: '1px solid rgba(180,190,200,0.4)',
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.8)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '30%',
          width: '150%',
          height: '100%',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
          transform: 'rotate(-45deg) translateY(-50%)',
          animation: 'glassReflection 8s infinite linear',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '120%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
        },
        '@keyframes glassReflection': {
          '0%': { transform: 'rotate(-45deg) translateY(-110%)' },
          '100%': { transform: 'rotate(-45deg) translateY(110%)' },
        },
      }}
    >
      {/* Window cross display removed - DIVIDED style not in WindowStyle enum */}
      {/* <WindowCross /> */}

      {/* Render style-specific elements (handles, dividers, etc.) */}
      <WindowStyleElement style={style} openingType={openingType} />

      {/* Opening indicators removed per user request */}
    </Box>
  );
};

// Interface for WindowVisualization component props
interface WindowVisualizationProps {
  windowCustomization: WindowCustomization;
  windowType?: string;
}

// Main Window Visualization component
export const WindowVisualization = ({
  windowCustomization,
  windowType = '1tsonh',
}: WindowVisualizationProps) => {
  // Frame color based on window material
  let frameColor = '#8B4513'; // default wooden color

  if (windowCustomization.material === WindowMaterial.VINYL) {
    frameColor = '#F8F8F8'; // white for VINYL/PVC
  } else if (windowCustomization.material === WindowMaterial.ALUMINUM) {
    frameColor = '#A9A9A9'; // gray for aluminum
  }

  // Calculate height percentage based on width and height ratio
  // This ensures the visualization always matches the actual dimensions
  const heightPercentage = windowCustomization.dimensions
    ? (windowCustomization.dimensions.height / windowCustomization.dimensions.width) * 100
    : 75;

  // Function to render a standard window pane section
  const renderWindowPane = (position: 'left' | 'right' | 'single' = 'single') => {
    return (
      <Box
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          background: 'linear-gradient(180deg, #F5FBFF 0%, #EDF6FA 100%)',
          borderRadius: '2px',
        }}
      >
        <WindowPane
          style={windowCustomization.style}
          openingType={windowCustomization.openingType}
          position={position}
        />
      </Box>
    );
  };

  // Function to render multiple panes side by side (for 2 or 3 piece windows)
  const renderMultiPanes = (count: number) => {
    const panes = [];
    const totalWidth = windowCustomization.dimensions.width;

    // Calculate default widths based on count
    const defaultSectionWidth = Math.round(totalWidth / count);

    // Get the actual section widths (with fallbacks to default values)
    const leftWidth = windowCustomization.topSection?.width || defaultSectionWidth;
    const middleWidth =
      count === 3 ? windowCustomization.bottomSection?.width || defaultSectionWidth : 0;

    // For positioning and sizing
    let remainingWidth = totalWidth;

    for (let i = 0; i < count; i++) {
      let sectionWidth;
      let position: 'left' | 'right' | 'single';

      if (i === 0) {
        // Left section
        sectionWidth = leftWidth;
        position = 'left';
        remainingWidth -= leftWidth;
      } else if (i === 1 && count === 3) {
        // Middle section (for three-pane windows)
        sectionWidth = middleWidth;
        position = 'right';
        remainingWidth -= middleWidth;
      } else {
        // Right section (or middle for two-pane windows)
        sectionWidth = remainingWidth;
        position = 'right';
      }

      // Percentage of the total width this pane should take
      const widthPercentage = (sectionWidth / totalWidth) * 100;

      panes.push(
        <Box
          key={i}
          sx={{
            width: `${widthPercentage}%`,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            background: 'linear-gradient(180deg, #F5FBFF 0%, #EDF6FA 100%)',
            borderRadius: '2px',
          }}
        >
          <WindowPane
            style={windowCustomization.style}
            openingType={windowCustomization.openingType}
            position={position}
          />
        </Box>
      );
    }
    return panes;
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* Window Visualization */}
      <Box
        sx={{
          width: '100%',
          paddingBottom: `${heightPercentage}%`, // This creates the correct aspect ratio
          maxHeight: '250px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: `10px solid ${windowCustomization.color || '#000000'}`,
            borderRadius: '4px',
            padding: '2px',
            backgroundColor: windowCustomization.color || '#000000',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15), 0 0 5px rgba(0,0,0,0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              zIndex: -1,
              borderRadius: '4px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            },
          }}
        >
          {/* Handle Top Light (Skylight) */}
          {windowCustomization.additionalFeatures?.topLight && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {(() => {
                // Calculate dimensions for top section and main section
                const totalHeight = windowCustomization.dimensions.height;
                const topSectionHeight =
                  windowCustomization.topSection?.height || totalHeight * 0.3;
                const mainSectionHeight = totalHeight - topSectionHeight;

                // Calculate percentages for rendering
                const topSectionPercent = (topSectionHeight / totalHeight) * 100;
                const mainSectionPercent = (mainSectionHeight / totalHeight) * 100;

                const isDivided =
                  windowCustomization.additionalFeatures?.skylightType === 'divided';

                return (
                  <>
                    {/* Top light section - handle skylight type */}
                    <Box
                      sx={{
                        width: '100%',
                        height: `${topSectionPercent}%`,
                        marginBottom: '20px',
                        position: 'relative',
                        display: 'flex',
                      }}
                    >
                      {/* For divided skylights, render panes side by side */}
                      {isDivided ? (
                        <>
                          {windowType === '3tsonh' ? (
                            // 3-piece window top section
                            <>{renderMultiPanes(3)}</>
                          ) : windowType === '2tsonh' ? (
                            // 2-piece window top section
                            <>{renderMultiPanes(2)}</>
                          ) : (
                            // Single window with divided top light
                            <>
                              <Box
                                sx={{
                                  flex: 1,
                                  height: '100%',
                                  backgroundColor: '#E6F4F7',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginRight: '10px',
                                }}
                              >
                                <WindowPane
                                  style={windowCustomization.style}
                                  openingType={windowCustomization.openingType}
                                  position="left"
                                />
                              </Box>
                              <Box
                                sx={{
                                  flex: 1,
                                  height: '100%',
                                  backgroundColor: '#E6F4F7',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginLeft: '10px',
                                }}
                              >
                                <WindowPane
                                  style={windowCustomization.style}
                                  openingType={windowCustomization.openingType}
                                  position="right"
                                />
                              </Box>
                            </>
                          )}
                        </>
                      ) : (
                        // Non-divided skylight - single pane
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <WindowPane
                            style={windowCustomization.style}
                            openingType={WindowOpeningType.FIXED}
                            position="single"
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Main window section - render based on window type */}
                    <Box
                      sx={{
                        width: '100%',
                        height: `${mainSectionPercent}%`,
                        display: 'flex',
                      }}
                    >
                      {windowType === '3tsonh' ? (
                        // 3-piece window
                        <>{renderMultiPanes(3)}</>
                      ) : windowType === '2tsonh' ? (
                        // 2-piece window
                        <>{renderMultiPanes(2)}</>
                      ) : (
                        // Single window
                        <>{renderWindowPane('single')}</>
                      )}
                    </Box>
                  </>
                );
              })()}
            </Box>
          )}
          {/* Handle Bottom Light (Underlight) */}
          {windowCustomization.additionalFeatures?.bottomLight &&
            !windowCustomization.additionalFeatures?.topLight && (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '4px' }}
              >
                {(() => {
                  // Use fixed percentages for main and bottom sections
                  const mainSectionPercent = 70;
                  const bottomSectionPercent = 30;

                  const isDivided =
                    windowCustomization.additionalFeatures?.underlightType === 'divided';

                  return (
                    <>
                      {/* Main window section - render based on window type */}
                      <Box
                        sx={{
                          width: '100%',
                          height: `${mainSectionPercent}%`,
                          marginBottom: '20px',
                          display: 'flex',
                        }}
                      >
                        {windowType === '3tsonh' ? (
                          // 3-piece window main section
                          <>{renderMultiPanes(3)}</>
                        ) : windowType === '2tsonh' ? (
                          // 2-piece window main section
                          <>{renderMultiPanes(2)}</>
                        ) : (
                          // Single window main section
                          <>{renderWindowPane('single')}</>
                        )}
                      </Box>

                      {/* Bottom light section */}
                      <Box
                        sx={{
                          width: '100%',
                          height: `${bottomSectionPercent}%`,
                          display: 'flex',
                        }}
                      >
                        {/* For divided underlights, render panes side by side */}
                        {isDivided ? (
                          <>
                            {windowType === '3tsonh' ? (
                              // 3-piece window with divided bottom light
                              <>{renderMultiPanes(3)}</>
                            ) : windowType === '2tsonh' ? (
                              // 2-piece window with divided bottom light
                              <>{renderMultiPanes(2)}</>
                            ) : (
                              // Single window with divided bottom light
                              <>
                                <Box
                                  sx={{
                                    flex: 1,
                                    height: '100%',
                                    background: 'linear-gradient(180deg, #EDF6F9 0%, #E1F1F6 100%)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '10px',
                                    borderRadius: '1px',
                                    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)',
                                  }}
                                >
                                  <WindowPane
                                    style={windowCustomization.style}
                                    openingType={windowCustomization.openingType}
                                    position="left"
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    flex: 1,
                                    height: '100%',
                                    background: 'linear-gradient(180deg, #EDF6F9 0%, #E1F1F6 100%)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '10px',
                                    borderRadius: '1px',
                                    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)',
                                  }}
                                >
                                  <WindowPane
                                    style={windowCustomization.style}
                                    openingType={windowCustomization.openingType}
                                    position="right"
                                  />
                                </Box>
                              </>
                            )}
                          </>
                        ) : (
                          // Non-divided underlight - single pane
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              background: 'linear-gradient(180deg, #EDF6F9 0%, #E1F1F6 100%)',
                              borderRadius: '1px',
                              boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)',
                            }}
                          >
                            <WindowPane
                              style={windowCustomization.style}
                              openingType={WindowOpeningType.FIXED}
                              position="single"
                            />
                          </Box>
                        )}
                      </Box>
                    </>
                  );
                })()}
              </Box>
            )}
          {/* Regular window (no top or bottom lights) */}
          {!windowCustomization.additionalFeatures?.topLight &&
            !windowCustomization.additionalFeatures?.bottomLight && (
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  padding: '0px',
                }}
              >
                {windowType === '3tsonh' ? (
                  // 3-piece window
                  <>{renderMultiPanes(3)}</>
                ) : windowType === '2tsonh' ? (
                  // 2-piece window
                  <>{renderMultiPanes(2)}</>
                ) : (
                  // Single window
                  <>{renderWindowPane('single')}</>
                )}
              </Box>
            )}
        </Box>
      </Box>
      {/* Caption showing the dimensions */}
      {windowCustomization.dimensions && (
        <Box sx={{ textAlign: 'center', fontSize: '0.85rem', color: 'text.secondary' }}>
          {windowCustomization.dimensions.width} {windowCustomization.dimensions.unit} ×{' '}
          {windowCustomization.dimensions.height} {windowCustomization.dimensions.unit}
        </Box>
      )}
    </Box>
  );
};

export default WindowVisualization;
