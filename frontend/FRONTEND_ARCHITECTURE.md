# RespireNet Frontend - Home Page Architecture

## Overview

The RespireNet frontend is a Vite + React application with a comprehensive landing page showcasing respiratory disease detection via AI. The home page follows a 10-section flow designed for engagement, education, and conversion.

## Project Structure

```
RespireNet/
├── src/
│   ├── components/
│   │   ├── Home/
│   │   │   ├── Home.jsx                        # Main page orchestrator (imports all sections)
│   │   │   └── sections/                       # 9 reusable sub-components
│   │   │       ├── Hero.jsx                    # Full-viewport hero with tagline + CTAs
│   │   │       ├── FeaturesGrid.jsx            # 6-card feature highlights
│   │   │       ├── HowItWorks.jsx              # 4-step timeline workflow
│   │   │       ├── LiveUploadSection.jsx       # Prominent upload preview
│   │   │       ├── SampleResultsPreview.jsx    # Mock prediction output + visualizations
│   │   │       ├── StatisticsBar.jsx           # 4 key metrics (accuracy, diseases, speed, privacy)
│   │   │       ├── SupportedConditionsGrid.jsx # 8 respiratory conditions grid
│   │   │       ├── FAQAccordion.jsx            # 6 collapsible FAQ items
│   │   │       └── CTASection.jsx              # Final call-to-action
│   │   ├── Predict/                            # Prediction form (unchanged)
│   │   ├── Report/                             # Results display (unchanged)
│   │   ├── Audio/                              # Audio input handling (unchanged)
│   │   ├── Header/                             # Navigation bar (unchanged)
│   │   ├── Footer/                             # Footer / disclaimer (unchanged)
│   │   └── About/                              # About page (unchanged)
│   ├── App.jsx                                 # React Router setup (routes: /, /predict, /about)
│   ├── main.jsx                                # Entry point
│   └── index.css                               # Global styles
├── package.json                                # Dependencies + scripts
├── vite.config.js                              # Vite configuration
├── tailwind.config.js                          # Tailwind CSS setup
└── README.md                                   # Original template README
```

## Page Flow (10 Sections)

### 1. **Hero Section** (`Hero.jsx`)
- **Purpose**: Grab attention and introduce the app's value.
- **Layout**: Full-viewport height with split layout (text left, animated icon right on desktop; stacked mobile).
- **Elements**:
  - Large heading: "Respiratory Health at Your Fingertips"
  - Subtitle describing the value proposition
  - Two CTAs: "Get Started" (→ `/predict`) and "Learn More" (scroll to Features)
  - Animated lung emoji 🫁
- **Animation**: Entrance animations on load; hover effects on buttons.

### 2. **Features Grid** (`FeaturesGrid.jsx`)
- **Purpose**: Educate about key benefits.
- **Layout**: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop) of 6 cards.
- **Features**:
  - 🎤 Easy Audio Upload
  - 🤖 AI-Powered Analysis
  - ⚡ Instant Results
  - 📊 Visual Insights
  - 🔒 Privacy Protected
  - ✓ Evidence-Based
- **Interaction**: Cards lift on hover; staggered entrance animation.

### 3. **How It Works** (`HowItWorks.jsx`)
- **Purpose**: Explain the process workflow transparently.
- **Layout**: 4-step horizontal timeline with connecting line (hidden on mobile).
- **Steps**:
  1. 🎤 Upload Audio — "Record or upload your cough audio file"
  2. 🔧 Feature Extraction — "AI extracts MFCC and Mel spectrograms"
  3. 🧠 Model Inference — "Deep learning model analyzes patterns"
  4. 📈 Get Results — "Receive predictions with confidence scores"
- **Interaction**: Colored dots; cards lift on hover.

### 4. **Live Upload Section** (`LiveUploadSection.jsx`)
- **Purpose**: Provide a prominent, interactive upload teaser.
- **Layout**: Centered box with border glow effect.
- **Elements**:
  - Large heading: "Try It Now"
  - Subtitle encouraging action
  - Drag-and-drop preview area with animated mic icon 🎙️
  - Two CTAs: "Upload Audio" and "Record Audio" (both → `/predict`)
  - Reassurance text: "Fast processing • Instant results • 100% private"
- **Interaction**: Drag-and-drop state visual feedback; animated icon bobbing.

### 5. **Statistics Bar** (`StatisticsBar.jsx`)
- **Purpose**: Build confidence with key metrics.
- **Layout**: Compact 4-column bar (2 cols mobile, 4 cols desktop).
- **Stats**:
  - 🎯 Accuracy Rate: 92%
  - 🏥 Diseases Detected: 8
  - ⚡ Processing Speed: <2s
  - 🔒 Privacy Score: 100%
- **Animation**: Icons scale on loop; numbers animate on scroll.

### 6. **Sample Results Preview** (`SampleResultsPreview.jsx`)
- **Purpose**: Show what users will experience.
- **Layout**: Two-column (text left, visuals right on desktop; stacked mobile).
- **Left Column**:
  - Mock prediction result (e.g., "Healthy" with 87.5% confidence)
  - Top 5 predictions with animated bar charts
- **Right Column**:
  - Placeholder boxes for Mel Spectrogram and Confidence Chart (visual previews)
- **Interaction**: Bars animate in on scroll; hover effects on cards.

### 7. **Supported Conditions Grid** (`SupportedConditionsGrid.jsx`)
- **Purpose**: Showcase the 8 conditions the model handles.
- **Layout**: Responsive grid (1 col mobile, 2 cols tablet, 4 cols desktop).
- **Conditions**:
  - 💨 Asthma
  - 🔴 Bronchitis
  - 🫁 Pneumonia
  - ⚠️ COPD
  - 🤒 URTI
  - 🌳 Bronchiectasis
  - 👶 Bronchiolitis
  - ✅ Healthy
- **Interaction**: Cards lift and scale on hover; emojis bounce on animation loop.

### 8. **FAQ Accordion** (`FAQAccordion.jsx`)
- **Purpose**: Address common concerns and build trust.
- **Layout**: Vertical accordion (collapsible items).
- **Questions**:
  1. How accurate is RespireNet? (92% average)
  2. Is my audio data safe? (Privacy-first explanation)
  3. Can RespireNet replace a doctor? (Disclaimer + recommendation)
  4. What audio formats are supported? (WAV, MP3, FLAC, AAC)
  5. How long does analysis take? (<2 seconds typical)
  6. Does RespireNet work offline? (Yes, locally)
- **Interaction**: Smooth expand/collapse with + icon rotation; staggered entrance.

### 9. **CTA Section** (`CTASection.jsx`)
- **Purpose**: Final push to action before footer.
- **Layout**: Centered text with two CTAs.
- **Elements**:
  - Large heading: "Take Control of Your Respiratory Health"
  - Subtitle + urgency text
  - Two buttons: "Start Prediction" (→ `/predict`) and "Learn More" (→ `/about`)
  - Feature callout: "100% Free • No Registration • <2 Seconds"
- **Animation**: Staggered entrance animations; button hover/tap effects.

### 10. **Footer**
- **Purpose**: Legal disclaimer.
- **Content**: Existing footer with medical warning (unchanged).

## Development Patterns

### Styling
- **Framework**: Tailwind CSS (dark theme with red-500 accents).
- **Colors**: 
  - Primary: `bg-black`, `bg-gray-900/50`
  - Accent: `text-red-500`, `border-red-500`
  - Text: `text-white`, `text-gray-300`
- **Responsive**: Mobile-first approach; breakpoints: `sm:`, `md:`, `lg:`.
- **Spacing**: Consistent use of padding/margins (`px-4 lg:px-8`, `py-20`, `gap-8`).

### Animation
- **Library**: Framer Motion for all entrance animations and interactions.
- **Patterns**:
  - `initial={{ opacity: 0, y: -20 }}` → `animate={{ opacity: 1, y: 0 }}` for entrance
  - `whileInView={{ ... }}` with `viewport={{ once: true }}` for scroll triggers
  - `whileHover={{ scale: 1.05 }}` for interactive elements
  - `animate={{ y: [0, -10, 0] }}` with `repeat: Infinity` for floating effects
- **Timing**: `duration: 0.6` to `0.8` for most animations; `delay` for staggered sequences.

### Reusability
- Each section is a self-contained component in `sections/`.
- No props between section components; all data is hardcoded or static.
- Shared styling patterns via Tailwind utility classes.
- Consistent use of `motion.*` wrappers from Framer Motion.

## Running the Frontend

### Development
```bash
cd RespireNet
npm install
npm run dev
```
Vite will start on `http://localhost:5173`.

### Build
```bash
npm run build
```
Outputs optimized assets to `dist/`.

### Preview
```bash
npm run preview
```
Serves the built output locally.

### Lint
```bash
npm run lint
```
Checks for ESLint errors (using React + Hooks + React Refresh rules).

## Adding or Modifying Sections

To add a new section:
1. Create a new file in `RespireNet/src/components/Home/sections/MySection.jsx`.
2. Export a React component using Framer Motion for animations.
3. Import it in `Home.jsx` and add it to the render order.
4. Use consistent Tailwind classes and animation patterns.

To modify an existing section:
1. Edit the file directly (e.g., `FeaturesGrid.jsx`).
2. Keep the component signature unchanged if it's already imported in `Home.jsx`.
3. Run `npm run lint` and `npm run dev` to verify.

## Performance Considerations

- All animations use Framer Motion's GPU-accelerated transforms (`opacity`, `scale`, `y`).
- No heavy images; most visuals are emoji or SVG text.
- `viewport={{ once: true }}` on `whileInView` ensures animations only trigger once on scroll.
- Tailwind CSS is tree-shaken at build time; unused styles are removed.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge).
- Tailwind CSS and Framer Motion support all modern versions.
- React 18.3.1 and Vite 5.4.9 ensure ES2020+ features.

## Accessibility

- Semantic HTML (`<section>`, `<h1>–<h6>`, `<button>`).
- Color contrast ratios meet WCAG AA standards (dark theme tested).
- Keyboard navigation on all interactive elements (buttons, accordion).
- Screen reader support via semantic markup (no aria- attributes needed for basics).

## Known Limitations

- FAQ accordion uses local state; state is lost on full page refresh.
- SampleResultsPreview shows mock data; integrate actual sample output later if needed.
- LiveUploadSection has placeholder drag-and-drop UI; actual upload happens via Predict.jsx.
- No lazy-loading of components; all sections load upfront (negligible for this size).

## Future Enhancements

- Video walkthrough section showing the app in action.
- Testimonials carousel with user feedback.
- Live prediction demo (requires backend).
- Localization support for multiple languages.
- Dark/light mode toggle (currently dark-only).
