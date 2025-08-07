import React from 'react';

type FrameSection = {
  width?: number; // percentage of parent width (0-100)
  height?: number; // percentage of parent height (0-100)
  position: 'top' | 'bottom' | 'left' | 'right' | 'middle';
};

type FrameLayout =
  | 'single'
  | 'double-vertical'
  | 'double-vertical-reversed'
  | 'double-horizontal'
  | 't-layout'
  | 'double-top'
  | 'triple-horizontal'
  | 'top-transom'
  | 'bottom-transom'
  | 'double-vertical-small-top'
  | 'double-vertical-small-bottom';

interface WindowConfig {
  width: number;
  height: number;
  color: string;
  partitions: {
    horizontal: number;
    vertical: number;
    vertical2?: number; // Optional second vertical divider proportion for triple layout
  };
  openingType?: 'fixed' | 'tilt' | 'turn';
  frameLayout?: FrameLayout;
  sections?: FrameSection[];
}

interface WindowPreviewProps {
  config: WindowConfig;
}

export default function WindowPreview({ config }: WindowPreviewProps) {
  const {
    width,
    height,
    color,
    partitions,
    openingType = 'fixed',
    frameLayout = 'single',
  } = config;

  const framePadding = 10;
  const glassPadding = 20;
  const frameThickness = 15;

  // Render a single pane with cross in the center
  const renderPane = (x: number, y: number, w: number, h: number) => {
    // Calculate the center of the pane
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    return (
      <g key={`pane-${x}-${y}`}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill="#e1f3ff"
          fillOpacity="0.7"
          stroke="#aaa"
          strokeWidth="1"
        />
        <line
          x1={centerX}
          y1={centerY - 15}
          x2={centerX}
          y2={centerY + 15}
          stroke="#888"
          strokeWidth="1"
        />
        <line
          x1={centerX - 15}
          y1={centerY}
          x2={centerX + 15}
          y2={centerY}
          stroke="#888"
          strokeWidth="1"
        />
      </g>
    );
  };

  // Render handle based on opening type
  const renderHandle = (x: number, y: number) => {
    if (openingType === 'fixed') return null;

    return (
      <g>
        <circle cx={x} cy={y} r={5} fill="#555" stroke="#333" strokeWidth="1" />
        {openingType === 'tilt' && (
          <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="#555" strokeWidth="2" />
        )}
        {openingType === 'turn' && (
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="#555" strokeWidth="2" />
        )}
      </g>
    );
  };

  // Render the window based on layout
  const renderWindow = () => {
    const innerWidth = width - framePadding * 2;
    const innerHeight = height - framePadding * 2;
    const frameX = framePadding;
    const frameY = framePadding;

    // Render the main frame
    const frame = (
      <rect
        x={frameX}
        y={frameY}
        width={innerWidth}
        height={innerHeight}
        fill={color}
        stroke="#ccc"
        strokeWidth="5"
      />
    );

    let panes = [];

    switch (frameLayout) {
      case 'double-vertical': {
        // Top smaller, bottom larger
        const dividerY = frameY + innerHeight * 0.35;
        const topHeight = dividerY - frameY - frameThickness / 2;
        const bottomHeight = innerHeight - topHeight - frameThickness;

        // Horizontal divider
        const divider = (
          <rect
            key="divider"
            x={frameX}
            y={dividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            innerWidth - 2 * (glassPadding - framePadding),
            topHeight - (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            glassPadding,
            dividerY + frameThickness / 2,
            innerWidth - 2 * (glassPadding - framePadding),
            bottomHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {divider}
            {panes}
            {renderHandle(width - 30, dividerY + frameThickness + 60)}
          </>
        );
      }

      case 'double-vertical-small-top': {
        // Top pane is 1/3 of height, bottom pane is 2/3
        const dividerY = frameY + innerHeight / 3;
        const topHeight = dividerY - frameY - frameThickness / 2;
        const bottomHeight = innerHeight - topHeight - frameThickness;

        // Horizontal divider
        const divider = (
          <rect
            key="divider"
            x={frameX}
            y={dividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            innerWidth - 2 * (glassPadding - framePadding),
            topHeight - (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            glassPadding,
            dividerY + frameThickness / 2,
            innerWidth - 2 * (glassPadding - framePadding),
            bottomHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {divider}
            {panes}
            {renderHandle(width - 30, dividerY + frameThickness + 60)}
          </>
        );
      }

      case 'double-vertical-reversed': {
        // Top larger, bottom smaller
        const dividerY = frameY + innerHeight * 0.65;
        const topHeight = dividerY - frameY - frameThickness / 2;
        const bottomHeight = innerHeight - topHeight - frameThickness;

        // Horizontal divider
        const divider = (
          <rect
            key="divider"
            x={frameX}
            y={dividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            innerWidth - 2 * (glassPadding - framePadding),
            topHeight - (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            glassPadding,
            dividerY + frameThickness / 2,
            innerWidth - 2 * (glassPadding - framePadding),
            bottomHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {divider}
            {panes}
            {renderHandle(width - 30, height / 2)}
          </>
        );
      }

      case 'double-horizontal': {
        // Side by side with configurable proportion
        const verticalProportion = config.partitions?.vertical || 0.5;
        const dividerX = frameX + innerWidth * verticalProportion;
        const leftWidth = dividerX - frameX - frameThickness / 2;
        const rightWidth = innerWidth - leftWidth - frameThickness;

        // Vertical divider
        const divider = (
          <rect
            key="divider"
            x={dividerX - frameThickness / 2}
            y={frameY}
            width={frameThickness}
            height={innerHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            leftWidth - (glassPadding - framePadding),
            innerHeight - 2 * (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            dividerX + frameThickness / 2,
            glassPadding,
            rightWidth - (glassPadding - framePadding),
            innerHeight - 2 * (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {divider}
            {panes}
            {renderHandle(dividerX - 30, height / 2)}
          </>
        );
      }

      case 'triple-horizontal': {
        // Triple side by side with configurable proportions
        const vertical1 = config.partitions?.vertical || 0.33;
        const vertical2 = config.partitions?.vertical2 || 0.66;

        const divider1X = frameX + innerWidth * vertical1;
        const divider2X = frameX + innerWidth * vertical2;

        const pane1Width = divider1X - frameX - frameThickness / 2;
        const pane2Width = divider2X - divider1X - frameThickness;
        const pane3Width = innerWidth - pane1Width - pane2Width - frameThickness * 2;

        // Vertical dividers
        const divider1 = (
          <rect
            key="divider1"
            x={divider1X - frameThickness / 2}
            y={frameY}
            width={frameThickness}
            height={innerHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        const divider2 = (
          <rect
            key="divider2"
            x={divider2X - frameThickness / 2}
            y={frameY}
            width={frameThickness}
            height={innerHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            pane1Width - (glassPadding - framePadding),
            innerHeight - 2 * (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            divider1X + frameThickness / 2,
            glassPadding,
            pane2Width - (glassPadding - framePadding),
            innerHeight - 2 * (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            divider2X + frameThickness / 2,
            glassPadding,
            pane3Width - (glassPadding - framePadding),
            innerHeight - 2 * (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {divider1}
            {divider2}
            {panes}
            {renderHandle(divider1X - 20, height / 2)}
          </>
        );
      }

      case 't-layout': {
        // Top horizontal, bottom two vertical with configurable proportions
        const horizontalProportion = config.partitions?.horizontal || 0.3;
        const horizontalDividerY = frameY + innerHeight * horizontalProportion;
        const topHeight = horizontalDividerY - frameY - frameThickness / 2;
        const bottomHeight = innerHeight - topHeight - frameThickness;

        // Vertical divider in bottom section - always in center
        const verticalDividerX = frameX + innerWidth * 0.5;

        // Horizontal divider
        const horizontalDivider = (
          <rect
            key="h-divider"
            x={frameX}
            y={horizontalDividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Vertical divider
        const verticalDivider = (
          <rect
            key="v-divider"
            x={verticalDividerX - frameThickness / 2}
            y={horizontalDividerY + frameThickness / 2}
            width={frameThickness}
            height={bottomHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            innerWidth - 2 * (glassPadding - framePadding),
            topHeight - (glassPadding - framePadding)
          )
        );

        const bottomPaneWidth = (innerWidth - frameThickness) / 2 - (glassPadding - framePadding);

        panes.push(
          renderPane(
            glassPadding,
            horizontalDividerY + frameThickness / 2,
            bottomPaneWidth,
            bottomHeight - (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            verticalDividerX + frameThickness / 2,
            horizontalDividerY + frameThickness / 2,
            bottomPaneWidth,
            bottomHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {horizontalDivider}
            {verticalDivider}
            {panes}
            {renderHandle(width - 30, horizontalDividerY - 20)}
          </>
        );
      }

      case 'top-transom': {
        // Top transom with three below (horizontal pane at top, with 3 vertical panes below)
        const horizontalDividerY = frameY + innerHeight * 0.25;
        const topHeight = horizontalDividerY - frameY - frameThickness / 2;
        const bottomHeight = innerHeight - topHeight - frameThickness;

        // Vertical dividers in bottom section
        const verticalDivider1X = frameX + innerWidth * 0.33;
        const verticalDivider2X = frameX + innerWidth * 0.66;

        // Horizontal divider
        const horizontalDivider = (
          <rect
            key="h-divider"
            x={frameX}
            y={horizontalDividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Vertical dividers
        const verticalDivider1 = (
          <rect
            key="v-divider1"
            x={verticalDivider1X - frameThickness / 2}
            y={horizontalDividerY + frameThickness / 2}
            width={frameThickness}
            height={bottomHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        const verticalDivider2 = (
          <rect
            key="v-divider2"
            x={verticalDivider2X - frameThickness / 2}
            y={horizontalDividerY + frameThickness / 2}
            width={frameThickness}
            height={bottomHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        // Top pane
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            innerWidth - 2 * (glassPadding - framePadding),
            topHeight - (glassPadding - framePadding)
          )
        );

        // Calculate bottom pane widths
        const bottomPaneWidth =
          (innerWidth - 2 * frameThickness) / 3 - (glassPadding - framePadding);

        // Bottom left pane
        panes.push(
          renderPane(
            glassPadding,
            horizontalDividerY + frameThickness / 2,
            bottomPaneWidth,
            bottomHeight - (glassPadding - framePadding)
          )
        );

        // Bottom middle pane
        panes.push(
          renderPane(
            verticalDivider1X + frameThickness / 2,
            horizontalDividerY + frameThickness / 2,
            bottomPaneWidth,
            bottomHeight - (glassPadding - framePadding)
          )
        );

        // Bottom right pane
        panes.push(
          renderPane(
            verticalDivider2X + frameThickness / 2,
            horizontalDividerY + frameThickness / 2,
            bottomPaneWidth,
            bottomHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {horizontalDivider}
            {verticalDivider1}
            {verticalDivider2}
            {panes}
            {renderHandle(width - 30, horizontalDividerY - 20)}
          </>
        );
      }

      case 'bottom-transom': {
        // Bottom transom with three above (horizontal pane at bottom, with 3 vertical panes above)
        const horizontalDividerY = frameY + innerHeight * 0.75;
        const bottomHeight = innerHeight - (horizontalDividerY - frameY) - frameThickness / 2;
        const topHeight = innerHeight - bottomHeight - frameThickness;

        // Vertical dividers in top section
        const verticalDivider1X = frameX + innerWidth * 0.33;
        const verticalDivider2X = frameX + innerWidth * 0.66;

        // Horizontal divider
        const horizontalDivider = (
          <rect
            key="h-divider"
            x={frameX}
            y={horizontalDividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Vertical dividers
        const verticalDivider1 = (
          <rect
            key="v-divider1"
            x={verticalDivider1X - frameThickness / 2}
            y={frameY}
            width={frameThickness}
            height={topHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        const verticalDivider2 = (
          <rect
            key="v-divider2"
            x={verticalDivider2X - frameThickness / 2}
            y={frameY}
            width={frameThickness}
            height={topHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Bottom pane
        panes.push(
          renderPane(
            glassPadding,
            horizontalDividerY + frameThickness / 2,
            innerWidth - 2 * (glassPadding - framePadding),
            bottomHeight - (glassPadding - framePadding)
          )
        );

        // Calculate top pane widths
        const topPaneWidth = (innerWidth - 2 * frameThickness) / 3 - (glassPadding - framePadding);

        // Top left pane
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            topPaneWidth,
            topHeight - (glassPadding - framePadding)
          )
        );

        // Top middle pane
        panes.push(
          renderPane(
            verticalDivider1X + frameThickness / 2,
            glassPadding,
            topPaneWidth,
            topHeight - (glassPadding - framePadding)
          )
        );

        // Top right pane
        panes.push(
          renderPane(
            verticalDivider2X + frameThickness / 2,
            glassPadding,
            topPaneWidth,
            topHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {horizontalDivider}
            {verticalDivider1}
            {verticalDivider2}
            {panes}
            {renderHandle(width - 30, horizontalDividerY + 30)}
          </>
        );
      }

      case 'double-top': {
        // Two panes on top, one on bottom
        const horizontalDividerY = frameY + innerHeight * 0.65;
        const topHeight = horizontalDividerY - frameY - frameThickness / 2;
        const bottomHeight = innerHeight - topHeight - frameThickness;

        // Vertical divider in top section
        const verticalDividerX = frameX + innerWidth * 0.5;

        // Horizontal divider
        const horizontalDivider = (
          <rect
            key="h-divider"
            x={frameX}
            y={horizontalDividerY - frameThickness / 2}
            width={innerWidth}
            height={frameThickness}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Vertical divider
        const verticalDivider = (
          <rect
            key="v-divider"
            x={verticalDividerX - frameThickness / 2}
            y={frameY}
            width={frameThickness}
            height={topHeight}
            fill={color}
            stroke="#ccc"
            strokeWidth="1"
          />
        );

        // Glass panes
        const topPaneWidth = (innerWidth - frameThickness) / 2 - (glassPadding - framePadding);

        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            topPaneWidth,
            topHeight - (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            verticalDividerX + frameThickness / 2,
            glassPadding,
            topPaneWidth,
            topHeight - (glassPadding - framePadding)
          )
        );

        panes.push(
          renderPane(
            glassPadding,
            horizontalDividerY + frameThickness / 2,
            innerWidth - 2 * (glassPadding - framePadding),
            bottomHeight - (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {horizontalDivider}
            {verticalDivider}
            {panes}
            {renderHandle(width - 30, horizontalDividerY + 30)}
          </>
        );
      }

      default: {
        // Single pane
        panes.push(
          renderPane(
            glassPadding,
            glassPadding,
            innerWidth - 2 * (glassPadding - framePadding),
            innerHeight - 2 * (glassPadding - framePadding)
          )
        );

        return (
          <>
            {frame}
            {panes}
            {renderHandle(width - 30, height / 2)}
          </>
        );
      }
    }
  };

  return (
    <svg width={width} height={height}>
      {renderWindow()}
    </svg>
  );
}
