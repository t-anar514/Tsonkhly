#!/bin/bash

# List of component directories to fix
COMPONENTS=(
  "mega-menu"
  "scroll"
  "markdown"
  "player"
  "navigation-bar"
  "lightbox"
  "image"
  "animate"
  "text-max-line"
  "label"
)

# Function to fix a component page
fix_component() {
  local component=$1
  local file="src/app/components/${component}/page.tsx"
  local title="Components: ${component^}"
  
  # Replace content with placeholder
  cat > "$file" << EOF
// ----------------------------------------------------------------------

export const metadata = {
  title: '${title}',
};

export default function ${component^}Page() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>${component^} Component</h2>
      <p>This component is currently unavailable.</p>
    </div>
  );
}
EOF

  echo "Fixed $component"
}

# Fix each component
for component in "${COMPONENTS[@]}"; do
  fix_component "${component}"
done

echo "All components fixed!"
