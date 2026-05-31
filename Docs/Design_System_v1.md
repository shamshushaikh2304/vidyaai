AryaLearn: The Premiere Design System v1.0
Philosophy: Cinematic & Intuitive
The Premiere system is built on a foundation of cinematic aesthetics and effortless intuition. It prioritizes immersion and emotional engagement for the student while providing clarity and confidence for the parent. Every color, component, and motion is designed to serve the narrative of learning.

1. Colors
Our palette is dark, premium, and focused. It uses a primary accent for action and a system of neutrals for depth and clarity.

Primary Palette

Name	Swatch	Token	Usage
Ink	#0A0A10	$color-background-primary	The primary background. A deep, near-black navy to reduce eye strain and enhance content.
Starlight	#FFC700	$color-accent-primary	The primary interactive color. Used for CTAs, progress bars, highlights, and awards. Represents achievement and focus.
White	#FFFFFF	$color-text-primary	Primary text, titles, and icons.
Slate	#8A8A9E	$color-text-secondary	Secondary text, metadata (e.g., episode duration), and inactive UI elements.
Fog	#404058	$color-ui-subtle	Borders, dividers, and card backgrounds in dense UIs (Parent Mode).
Functional Palette

Name	Swatch	Token	Usage
Success	#30C759	$color-functional-success	Quiz completion, correct answers, streak continuation.
Warning	#FF9500	$color-functional-warning	Gentle prompts, incomplete sections.
Error	#FF3B30	$color-functional-error	Incorrect answers (used sparingly to avoid discouragement).
2. Typography
We use a dual-font system: a commanding serif for cinematic titles (Shows/Seasons) and a hyper-legible sans-serif for UI and instructional content.

Display Font (Sovereign): A custom, elegant serif for headlines. h1, h2.
UI Font (Clarity Sans): A versatile, geometric sans-serif for all other text.
Type Scale (Mobile First)

Name	Font	Size/Line Height	Token	Usage
Display XL	Sovereign	34px / 40px	$font-display-xl	Show Title on Detail Screen
Display L	Sovereign	28px / 34px	$font-display-l	Season Titles, Home Screen Section Headers
Heading	Clarity Sans	22px / 28px	$font-heading	Episode Titles, Card Headers
Subheading	Clarity Sans	17px / 22px	$font-subheading	Key UI labels, Button text
Body	Clarity Sans	15px / 20px	$font-body	Descriptions, explanations, paragraphs
Caption	Clarity Sans	13px / 18px	$font-caption	Metadata (duration, status), helper text
3. Design Tokens
All values are stored as design tokens to ensure consistency and scalability. This is a non-negotiable principle.

Color Tokens: $color-background-primary, $color-accent-primary, etc.
Font Tokens: $font-display-xl, $font-body, etc.
Spacing Tokens: $spacing-xs, $spacing-s, $spacing-m, $spacing-l, $spacing-xl
Radius Tokens: $radius-s (Buttons), $radius-m (Cards), $radius-l (Hero Cards)
Shadow Tokens: $shadow-card, $shadow-modal
4. Spacing & Grid
A consistent spatial system creates rhythm and clarity. Our system is based on an 8px base unit.

$spacing-xs: 4px
$spacing-s: 8px
$spacing-m: 16px
$spacing-l: 24px
$spacing-xl: 32px
$spacing-xxl: 48px
Grid System

Mobile: A 4-column grid with $spacing-m (16px) margins. Content is primarily single-column for focus.
Desktop: A 12-column grid with $spacing-xl (32px) margins. Allows for more complex layouts, especially in the Parent curriculum browser.
5. Components
Components are the building blocks of our interface. They are designed for reuse and consistency.

Buttons
Type	Style	Usage
Primary	Solid $color-accent-primary fill, $color-background-primary text.	The most important action on a screen (e.g., "Resume Episode," "Start Quiz").
Secondary	$color-ui-subtle fill, $color-text-primary text.	Secondary actions (e.g., "Browse All," "View Details").
Tertiary (Ghost)	No fill, $color-text-secondary text.	Low-priority actions (e.g., "Skip," "Remind Me Later").
Play Icon Button	Circular. Often overlaid on cards. Features a prominent play icon.	Universal affordance for starting content.
Cards
Cards are our primary content containers. They are designed to feel like posters and portals.

Student Experience Cards

Hero Card (Continue Learning)
Purpose: The most prominent element on Home. Drive immediate re-engagement.
Structure: Large, landscape format (16:9). Rich show art background with a gradient overlay for text legibility. Contains Show Title, Episode Title, a large $color-accent-primary progress bar, and a Primary "Resume" Button.
Show Card (Browse Subjects)
Purpose: To represent an entire series (e.g., "Pizza Planet").
Structure: Portrait format (2:3), resembling a movie poster. Dominated by stunning, custom show art. Title ($font-heading) is set in Sovereign. No progress bar.
Episode Card (Today's Lineup, Season Detail)
Purpose: To represent a single learning episode.
Structure: Landscape format (16:9). Features a compelling thumbnail from the episode. Title ($font-subheading) at the bottom. A thin $color-accent-primary progress bar is overlaid along the bottom edge. A play icon appears on hover/tap. A checkmark icon replaces the progress bar on completion.
Parent Experience Components

Parent Mode utilizes the same core system but prioritizes information density and clarity.

Curriculum Card
Purpose: To show the mapping between official curriculum and AryaLearn content.
Structure: A rectangular, list-item-like card with a $color-ui-subtle background.
Left Side: Displays curriculum data in $font-body. (e.g., "CBSE > Class 5 > Fractions").
Right Side: Displays the mapped AryaLearn content (e.g., "Pizza Planet: S2 E3").
Status Indicator: A small dot ($color-functional-success for covered, $color-functional-warning for upcoming) provides at-a-glance status.
Progress Summary Chart
Purpose: Provide parents a quick overview of weekly progress.
Structure: A simple, clean bar chart. Each bar represents a day of the week, with height corresponding to "Episodes Completed." Uses $color-accent-primary for bars against the $color-background-primary viewport.
6. Animation & Motion Guidelines
Motion is narrative. It guides the user, provides feedback, and adds to the cinematic feel. All animations should be fluid and purposeful, never jarring.

Principle 1: "The Spotlight" (Feedback)
Use: On interactive elements like cards and buttons.
Effect: On hover (desktop) or tap-down (mobile), the element subtly scales up (1.03x) and a soft, diffused glow appears around it.
Tokens: duration: 150ms, easing: ease-out
Principle 2: "The Dissolve" (Transitions)
Use: Full-screen transitions (e.g., Home to Show Detail).
Effect: A smooth, quick cross-fade. The outgoing screen fades to 0% opacity while the incoming screen fades from 0% to 100%.
Tokens: duration: 300ms, easing: ease-in-out
Principle 3: "The Reveal" (Content Loading)
Use: When loading content within a screen (e.g., rows on Home).
Effect: Content gracefully fades in and slides up slightly (8px). Rows load sequentially, creating a gentle cascade effect.
Tokens: duration: 400ms, easing: ease-in-out, stagger: 50ms
Principle 4: "The Celebration" (Reward)
Use: On completing an episode or earning an achievement.
Effect: The progress bar animates to full with a bright shimmer. Confetti-like particles of $color-accent-primary burst from the center of the screen.
Tokens: duration: 500ms, easing: elastic
7. Platform Design Rules
Mobile (Priority)
Navigation: A persistent bottom navigation bar with 4 icons: Home, Learn (Browse), Progress, Parent Mode.
Interaction: Design for thumbs. All primary CTAs and interactive elements must be in the lower two-thirds of the screen.
Tap Targets: Minimum tap target size is 44px by 44px, even for smaller icons.
Gestures: Utilize horizontal swipes to navigate through carousels (e.g., "Today's Lineup").
Desktop
Navigation: A collapsed icon-based sidebar on the left that expands on hover to reveal text labels. Mirrors the mobile navigation structure.
Layout: Use the 12-column grid to display more content. Card carousels show more items (5-6) compared to mobile (1.5-2.5).
Interaction: Leverage hover states for "Spotlight" effects and to reveal tooltips or secondary actions.
Focus: The Parent Curriculum Browser is optimized for desktop, using a three-pane layout (Board > Class > Subject/Topics) for efficient navigation.