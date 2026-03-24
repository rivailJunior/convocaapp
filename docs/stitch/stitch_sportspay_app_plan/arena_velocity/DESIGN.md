# Design System: Editorial Athletics & Financial Precision

## 1. Overview & Creative North Star
The creative North Star for this design system is **"The Kinetic Ledger."** 

We are moving beyond the static, boxy constraints of traditional fintech. This system merges the high-performance energy of athletic tracking (Strava) with the radical clarity of modern Brazilian banking (Nubank). To achieve a "signature" feel, we reject generic templates in favor of **Tonal Depth** and **Asymmetric Breathing Room**. 

The interface should feel like a premium sports magazine: bold headlines, layered surfaces that mimic physical stadium architecture, and a "glass-on-grass" aesthetic where the vibrant lime accent cuts through deep green foundations with surgical precision.

---

## 2. Colors & Surface Logic

### The Palette
We utilize a sophisticated Material Design 3 mapping to ensure the deep `primary` (#266829) and high-octane `secondary` (#496400 / #AEEA00 variant) work in harmony without vibrating.

*   **Primary (Deep Field):** `#266829` — Use for high-authority branding and primary actions.
*   **Secondary (Kinetic Lime):** `#B9F61D` — Reserved for "Action Triggers" and momentum-based UI elements.
*   **Surface Foundation:** `#F5F6F7` — A cool, neutral off-white that prevents eye fatigue.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** 
Sectioning must be achieved through background shifts. To separate a list of transactions from a header, transition from `surface` to `surface-container-low`. Boundaries are felt through tonal changes, not drawn with lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets. 
*   **Level 0 (Base):** `surface` (#f5f6f7)
*   **Level 1 (Sectioning):** `surface-container-low` (#eff1f2)
*   **Level 2 (Active Cards):** `surface-container-lowest` (#ffffff) 

### The "Glass & Gradient" Rule
For primary CTAs and the Floating Action Button (FAB), use a **Kinetic Gradient**: a subtle linear transition from `primary` (#266829) to `primary_dim` (#185c1e) at a 145° angle. For overlays (like Bottom Sheets), employ **Glassmorphism**: use `surface` at 80% opacity with a `20px` backdrop-blur to maintain a sense of environmental depth.

---

## 3. Typography: Editorial Authority
We pair **Plus Jakarta Sans** (Display/Headlines) with **Inter** (Body/Labels) to create a "Technical-meets-Friendly" vibe.

*   **Display & Headline (Plus Jakarta Sans):** These are your "Stadium Jumbotron" moments. Use `headline-lg` (2rem) for account balances and `headline-sm` (1.5rem) for section titles. The rounded nature of Jakarta reflects the friendliness of the brand.
*   **Title & Body (Inter):** Inter provides the "Financial Ledger" precision. Use `body-lg` (1rem) for transaction descriptions and `label-md` (0.75rem) for metadata like "DD/MM" dates.
*   **Editorial Scaling:** Don't be afraid of extreme contrast. A large `display-md` balance should sit confidently next to a quiet `label-sm` timestamp.

---

## 4. Elevation & Depth

### The Layering Principle
Avoid traditional "shadow-everything" approaches. To elevate a card, simply place a `surface-container-lowest` (#ffffff) card onto a `surface` (#f5f6f7) background. The 16px (`xl`) corner radius provides enough visual separation.

### Ambient Shadows
When a card must "float" (e.g., a high-priority payment alert), use an **Ambient Glow**:
*   **X: 0, Y: 8, Blur: 24**
*   **Color:** `on-surface` (#2c2f30) at **4% opacity**.
This mimics natural stadium lighting rather than a harsh digital drop shadow.

### The "Ghost Border" Fallback
If contrast is required for accessibility (e.g., an empty state), use a **Ghost Border**: `outline-variant` (#abadae) at **15% opacity**. Never use a solid, opaque border.

---

## 5. Components

### The "Pulse" Buttons
*   **Primary:** Filled with the Kinetic Gradient. 12px (`lg`) radius. Typography: `title-sm` (Inter, Bold).
*   **Secondary:** Ghost style (no fill). Typography: `primary` color. Use for "Cancel" or "View All."
*   **FAB:** The "Action Hub." 24px (`xl`) radius. Always `primary` container with a `secondary` icon for high-energy contrast.

### Kinetic Chips (Status Badges)
Status is indicated by tonal "pills," not just text color:
*   **Confirmed:** `primary-container` fill with `on-primary-container` text.
*   **Pending:** `warning` (#FB8C00) at 15% opacity fill with `warning` text.
*   **Declined/Removed:** `error-container` fill with `on-error-container` text.

### Cards & Transaction Lists
*   **Cards:** 16px (`xl`) radius. No borders. Spacing within cards should follow the `4` (1rem) scale.
*   **Lists:** **Strictly no dividers.** Use 12px (`6` in spacing scale) of vertical white space to separate list items. The `on-surface-variant` (#595c5d) text provides enough hierarchy for secondary info (R$ currency).

### Inputs
*   **The "Bottom-Heavy" Input:** Use a subtle `surface-container-high` fill. Instead of a full box, use a thicker 2px "Focus Indicator" at the bottom using the `secondary` (Lime) color when the user taps.

---

## 6. Do's and Don'ts

### Do
*   **DO** use Brazilian formatting: `R$ 1.250,00` and `25/12/2023`.
*   **DO** lean into "Asymmetric Breathing." If a section has 24px of top margin, give it 32px of bottom margin to create a sense of forward motion.
*   **DO** use **Filled, Rounded Icons** (Material You style) to match the typography's softness.

### Don't
*   **DON'T** use pure black (#000). Always use `on-surface` (#2c2f30) for text to maintain the "Editorial" feel.
*   **DON'T** use 1px dividers. If you feel the need for a line, increase the `spacing-6` (1.5rem) gap instead.
*   **DON'T** use the Secondary Lime for body text. It is an **action-only** color; it lacks the contrast for sustained reading.

### Spacing Cheat Sheet
*   **Horizontal Screen Margins:** `spacing-4` (1rem / 16px).
*   **Between Sections:** `spacing-6` (1.5rem / 24px).
*   **Inside Cards:** `spacing-4` (1rem / 16px).