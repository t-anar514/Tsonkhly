const fs = require('fs');
const path = require('path');

// List of all component directories that need to be fixed
const componentsToFix = [
  'player',
  'navigation-bar',
  'lightbox',
  'image',
  'animate',
  'text-max-line',
  'label'
];

const componentsDir = path.join(__dirname, 'src', 'app', 'components');

// Function to fix a component page
function fixComponent(componentName) {
  const pageFilePath = path.join(componentsDir, componentName, 'page.tsx');
  
  if (!fs.existsSync(pageFilePath)) {
    console.log(`File not found: ${pageFilePath}`);
    return;
  }

  // Format the component title properly
  const formattedName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Generate the placeholder component
  const placeholderContent = `// ----------------------------------------------------------------------

export const metadata = {
  title: 'Components: ${formattedName}',
};

export default function ${formattedName.replace(/\s+/g, '')}Page() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>${formattedName} Component</h2>
      <p>This component is currently unavailable.</p>
    </div>
  );
}
`;

  // Write the placeholder component to the file
  fs.writeFileSync(pageFilePath, placeholderContent);
  console.log(`Fixed ${componentName} component`);
}

// Fix all components
componentsToFix.forEach(fixComponent);
console.log('All components fixed!');
