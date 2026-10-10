# BazarDor — Design Tokens & Layout Report (Extracted from Penpot)

**Source file:** `Bazardor -Assignment-07.penpot`
**File id:** `442c7c0e-28ac-80e5-8008-c02a9b97960d`
**File name:** `"Bazardor - L1_ Assignment-07"`
**Design system base font size:** `16px`
**Page workspace:** `Desktop` (#1e1e1e background)

---

## 1. Color Tokens

Token-set key: `Bazardor/Color/Light` (active theme: **Light**).
All values cross-verified from `tokens.json` (RGB → HEX conversion applied, and visually confirmed from shape-level `fillColor` fields).

### 1.1 Core Palette

| Token Key            | HEX       | RGB                 | Usage / description                                                     |
| -------------------- | --------- | ------------------- | ----------------------------------------------------------------------- |
| `primary`            | `#05893E` | `rgb(5, 137, 62)`   | Brand green — Primary CTA bg, chip labels, pressed/hover link primary   |
| `primary.strong`     | `#047F39` | `rgb(4, 127, 57)`   | Darker green — Primary button border stroke (strong variant)            |
| `success`            | `#1A9951` | `rgb(26, 153, 81)`  | Green for ▼ "price decreased" indicators and success states             |
| `error`              | `#D03739` | `rgb(208, 55, 57)`  | Red for ▲ "price increased" indicators, error messages                 |
| `base-100`           | `#FAFCFA` | `rgb(250,252,250)`  | Surface / Card bg, Header/Footer bg (95% opaque on Header overlay)     |
| `base-200`           | `#F0F5F0` | `rgb(240,245,240)`  | Page canvas bg, chip/category default bg, badge default bg, subtle rows |
| `base-300`           | `#E1E8E1` | `rgb(225,232,225)`  | Default card/frame stroke, Header bottom border, dividers              |
| `white`              | `#FFFFFF` | `rgb(255,255,255)`  | Pure white (transparent layer used over hero image placeholder)        |
| `base-content`       | `#1D271F` | `rgb(29, 39, 31)`   | Primary text color (body, headings, icons — 100% or 70% opacity)       |
| `primary-content`    | `#F3FBF4` | `rgb(243,251,244)`  | Text color *on* primary button (white-tinged green-cream)              |
| `error-content`      | `#FFF6F5` | `rgb(255,246,245)`  | Text color *on* error / destructive surfaces                           |

### 1.2 Hover / Border / Interaction States

| Token Key                   | HEX       | RGB                  | Where applied                                              |
| --------------------------- | --------- | -------------------- | ---------------------------------------------------------- |
| `hover.primary-border`      | `#037333` | `rgb(3, 115, 51)`    | Primary button pressed border                             |
| `hover.error-bg`            | `#BD3133` | `rgb(189, 49, 51)`   | Error / red badge surface bg (▲)                          |
| `hover.error-border`        | `#B02D2F` | `rgb(176, 45, 47)`   | Error border / focus ring                                 |
| `hover.neutral-bg`          | `#DADEDA` | `rgb(218,222,218)`   | Neutral (gray) category/btn hover bg                      |
| `hover.neutral-border`      | `#CCD0CC` | `rgb(204,208,204)`   | Neutral border hover                                      |
| `hover.link-primary`        | `#02642B` | `rgb(2, 100, 43)`    | Link / text press color (darkest green)                   |

---

## 2. Typography Scale

**Single font family across the design:** `Hind Siliguri` (Google Font id: `gfont-hind-siliguri`, for Bangla + Latin script).
**Font weights used:** `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`.

**Total distinct typography styles discovered: 25** (from 25 JSON files in `typographies/` folder).

Table below — sizes in px, line-height in CSS-meaningful value (ratio or equivalent px), letter-spacing in px.

| #   | Style name (as designed)            | Size (px) | Weight | Line-height (ratio) | LH (px ≈) | Letter-spacing (px) | Typical usage found in file                                                    |
| --- | ----------------------------------- | --------- | ------ | ------------------- | --------- | ------------------- | ------------------------------------------------------------------------------ |
| 1   | `36 Bold · 45`                      | 36        | 700    | 1.25                | 45        | 0                   | **Hero H1 heading** ("আজকের বাজারের দাম এক নজরে")                             |
| 2   | `32 Bold · 48`                      | 32        | 700    | 1.5                 | 48        | 0                   | Large section headings / promotional titles                                    |
| 3   | `30 Bold · 36`                      | 30        | 700    | 1.20                | 36        | 0                   | Alternate tight H2                                                              |
| 4   | `30 Bold · 37.5`                    | 30        | 700    | 1.25                | 37.5      | 0                   | Alternate loose H2                                                              |
| 5   | `24 Bold · 32`                      | 24        | 700    | 1.3333              | 32        | 0                   | Section sub-heading H3                                                          |
| 6   | `20 Bold · 28` (with `-0.5` LS)     | 20        | 700    | 1.40                | 28        | **-0.5**           | Section headings with tight tracking (variation)                               |
| 7   | `20 Bold · 28` (0 LS)               | 20        | 700    | 1.40                | 28        | 0                   | **Section titles** ("আজ দাম বেড়েছে", "আজ দাম কমেছে", "সব পণ্য") - default     |
| 8   | `18 Bold · 28`                      | 18        | 700    | 1.5555              | 28        | 0                   | Prominent card titles / in-page emphasis                                        |
| 9   | `18 SemiBold · 28`                  | 18        | 600    | 1.5555              | 28        | 0                   | Product bold labels / sub-head Semibold                                         |
| 10  | `16 SemiBold · 24`                  | 16        | 600    | 1.5                 | 24        | 0                   | Category labels / Nav primary links, Product-card price                        |
| 11  | `16 Medium · 24`                    | 16        | 500    | 1.5                 | 24        | 0                   | Supporting labels, interactive hints                                            |
| 12  | `16 Regular · 24`                   | 16        | 400    | 1.5                 | 24        | 0                   | **Hero subtitle** / body copy (opacity 0.7 for muted para)                    |
| 13  | `14 Bold · 21`                      | 14        | 700    | 1.5                 | 21        | 0                   | Highlight 14 bold                                                                |
| 14  | `14 SemiBold · 21`                  | 14        | 600    | 1.5                 | 21        | 0                   | **Primary button label** ("সব পণ্য দেখুন") → color #F3FBF4 (primary-content)   |
| 15  | `14 SemiBold · 20`                  | 14        | 600    | 1.4286              | 20        | 0                   | Nav row/meta Semibold alt (tight)                                               |
| 16  | `14 Medium · 21`                    | 14        | 500    | 1.5                 | 21        | 0                   | Footer text ("বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে")                      |
| 17  | `14 Medium · 20`                    | 14        | 500    | 1.4286              | 20        | 0                   | **Hero eyebrow pill text** (date) → 14/500 green #05893E                     |
| 18  | `14 Regular · 21`                   | 14        | 400    | 1.5                 | 21        | 0                   | Footer disclaimer (right-aligned), meta                                         |
| 19  | `14 Regular · 20`                   | 14        | 400    | 1.4286              | 20        | 0                   | Subtitle/caption 14 regular alt                                                 |
| 20  | `12 SemiBold · 18`                  | 12        | 600    | 1.5                 | 18        | 0                   | Small card badge labels, section sub-meta                                       |
| 21  | `12 SemiBold · 17.1`                | 12        | 600    | 1.425               | 17.1      | 0                   | Micro-label SB variant                                                          |
| 22  | `12 SemiBold · 16`                  | 12        | 600    | 1.3333              | 16        | 0                   | Tight micro pill label                                                          |
| 23  | `12 Regular · 18`                   | 12        | 400    | 1.5                 | 18        | 0                   | Captions / secondary card info                                                  |
| 24  | `12 Regular · 16`                   | 12        | 400    | 1.3333              | 16        | 0                   | Tiny tight caption                                                              |
| 25  | `11 SemiBold · 16.5`                | 11        | 600    | 1.5                 | 16.5      | 0                   | Smallest tag / badge percent label (inside Price Change Badge)                 |

---

## 3. Pages & Layouts Structure

### 3.1 All pages/boards discovered (from Root Frame shapes in `00000000…json`)

Page workspace name: **`Desktop`** (id: `442c7c0e-28ac-80e5-8008-c02a9bd51966`, bg `#1e1e1e`).

**7 boards (frames) — all canvas width = 1440 px.**

| Frame order | Board name               | Position (x,y) | Width (px) | Height (px) | Canvas bg (fill) | Notes                                       |
| ----------- | ------------------------ | -------------- | ---------- | ----------- | ---------------- | ------------------------------------------- |
| 1           | **Home**                 | (0, 0)         | 1440       | 3141        | `#F0F5F0`        | **Primary Home page** — deepest content     |
| 2           | **Sign Up**              | (1520, 0)      | 1440       | 1014        | `#F0F5F0`        | Auth — register                             |
| 3           | **Sign In**              | (3040, 0)      | 1440       | 900         | `#F0F5F0`        | Auth — login                                |
| 4           | **Profile**              | (4560, 0)      | 1440       | 1047        | `#F0F5F0`        | User profile / settings                     |
| 5           | **Category**             | (6080, 0)      | 1440       | 892         | `#F0F5F0`        | Category listing page (shallowest content)  |
| 6           | **Product Details**      | (7600, 0)      | 1440       | 1489        | `#F0F5F0`        | PDP — product detail                        |
| 7           | **Home - User Menu Open**| (9120, 9)      | 1440       | 900         | `#F0F5F0`        | Home with user dropdown expanded (hidden)   |

### 3.2 Home Page — vertical stack (1440 × 3141)
Analyzed fully (all 5 top-level sections of `Page Layout`). All sections sit inside a centered **Stack** container: 1152 px wide (x:144→1296), with padding `24/16/24/16` and inter-section vertical gap = **40 px**.

| Section # | Name        | Y start | Height (px) | Inner width (px) | Notes |
| --------- | ----------- | ------- | ----------- | ---------------- | ----- |
| 1 (top)   | **Header**  | 0       | 118         | 1440 (full)      | Two rows: top row 68 + bottom row 49, bottom border 1px #E1E8E1 |
| 2         | **Ticker**  | 118     | 37          | 1440 (full)      | Top + bottom border 1px inner #E1E8E1, bg #FAFCFA |
| 3         | **Main**    | 155     | 2869        | 1440             | Contains centered 1152 Stack (below)       |
| 3a        | → Spacer    | 3024    | 48          | 1                | 48px vertical spacer above footer           |
| 4 (bottom)| **Footer**  | 3072    | 69          | 1440 (full)      | Top border 1px #E1E8E1, bg #FAFCFA          |

#### Main inner stack (1152px wide) — 4 sections, vertical rowGap = 40 px, column-reverse = visually ordered top→bottom as below:

| Visual order (top→bottom) | Section name                   | Size (W×H px)  | Children                                                                     |
| ------------------------- | ------------------------------ | -------------- | ---------------------------------------------------------------------------- |
| 1 (top, under ticker)     | **Hero**                       | 1120 × 283     | Hero-Content row (1118×343 internally, clipped by borderRadius:24 frame)     |
| 2                         | **Section / Price Movers #1**  | 1120 × 332     | Section Row: ▲ + "আজ দাম বেড়েছে" (title) → grid of 6 product cards (3×2)    |
| 3                         | **Section / Price Movers #2**  | 1120 × 332     | Section Row: ▼ + "আজ দাম কমেছে" (title) → grid of 6 product cards (3×2)      |
| 4 (bottom)                | **Section / All Products**     | 1120 × 1754    | Heading "সব পণ্য" (20/700) + sub-caption + 33 product grid (3 cols × 11 rows)|

---

## 4. Spacing, Radii & Shadows

### 4.1 Layout constants

| Constant                     | Value (px)  | Where it lives                                                                 |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------ |
| Canvas width                 | 1440        | All boards                                                                     |
| **Container max-width**      | **1152**    | Main Stack (`x:144`, `x2:1296`) → side gutters 144 each                       |
| Section horizontal inset    | 160         | Section containers are 1120 wide (1440-2×160)                                  |
| Stack padding                | 24 / 16 / 24 / 16 | Main inner stack (top/right/bottom/left)                                 |
| Section → section gap        | 40          | `rowGap` on main flex stack (between Hero / Price Movers 1 / 2 / AllProducts) |
| Section title → grid gap     | 12          | gap between title row (28) and product grid list inside PriceMover sections   |
| Grid vertical gap inside "All Products" | 16 | rowGap on 33-card wrap list (11 rows × 16 gaps)                          |
| Grid horizontal gap          | 16          | columnGap on all product grids (both Price Movers and "All Products")         |
| Section header internal gap  | 8           | Between ▲▼ icon + section title text                                           |
| Header total height          | 118         | Two stacked rows (68 + 49 + 1 visual separator)                                |
| Header Row 1 height          | 68          | Top bar (logo / spacer / button)                                               |
| Header Row 2 height          | 49          | Nav categories bar                                                             |
| Footer total height          | 69          | One row (68 content + 1 top stroke)                                            |
| Spacer above footer          | 48          |                                                                                |
| Ticker height                | 37          | Inner ticker track is 36 px                                                    |

### 4.2 Radii (borderRadius)

| Radius (px) | Named usage                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| **24**      | Hero banner outer frame (r1=r2=r3=r4=24), Card inner product icon square **12** radius |
| **16**      | Outer Product Card (all 4 corners, shape-level r1/r2/r3/r4 = 16)           |
| **14**      | Hero eyebrow / date pill (all 4 = 14)                                       |
| **12**      | Price Change Badge (▲▼ percent pill) - radius 12; Product Icon (48×48) r=12 |
| **8**       | Primary & Ghost buttons, Category chips (r1/r2/r3/r4 = 8)                   |

### 4.3 Shadows (only Primary button defines them — no card shadows!)

**Primary CTA button — 3 stacked shadows (Penpot multi-shadow):**

```css
/* Shadow 1 — bottom glow drop */
box-shadow: 0 4px 3px -2px rgba(5, 137, 62, 0.30),
/* Shadow 2 — secondary soft drop */
            0 3px 2px -2px rgba(5, 137, 62, 0.30),
/* Shadow 3 — inner highlight on the button top */
            inset 0 0.5px 0 0.5px rgba(255, 255, 255, 0.06);
```

> Important: **Product cards have zero shadow defined** (only 1px inner stroke #E1E8E1, bg #FAFCFA, radius 16).
> Hero has no shadow, only 1px inner stroke #E1E8E1.

---

## 5. Component-specific measurements

### 5.1 Header / Navbar

**Outer Header:** 1440 × 118, fill `#FAFCFA` @ 95% opacity, inner bottom stroke 1× #E1E8E1 (appliedTokens `fill:base-100, strokeColor:base-300`).

#### Navbar Row 1 (top bar): 1164 wide × 68 tall, centered (x:138 → x2:1302)
- padding: **12 / 16 / 12 / 16**
- flex: row-reverse, align-items:center, columnGap = **12**
- 3 children (from row shapes array, visual top→bottom/right→left as reverse):
  - **right: Button / Ghost** (Sign In): 117.3 × **40**; padding `1 / 17 / 1 / 17`; radius **8**; gap=8 (icon+text); bg transparent, no stroke
  - **middle: Spacer 801.5 wide** (flex-grow equivalent) → 1 px tall, invisible, centered between
  - **left: Link** (Brand + Logo area): 189.2 × 44; flex row, gap=8; contains text + logo.

#### Navbar Row 2 (category bar): full 1440 × 49 (starts y=68)
- top stroke 1× inner #F0F5F0 (base-200), bg #FAFCFA
- Inner Nav container 1152 × 48 (x:144), padding 0/16/0/16
  - List: **1120 × 48**, padding **8 / 0 / 8 / 0**, columnGap **4**
  - **8 category chips** (shape list = 8 items). One sample chip `Nav / Category Chip`:
    - 67.2 (auto) × **32**
    - padding: **1 / 13 / 1 / 13**
    - radius **8** (all corners)
    - gap 6 (icon + label)
    - default state: **no fill** (transparent / inherit), **no stroke**

### 5.2 Marquee / Ticker

- Height: **37 px** (1440 × 37), bg: `#FAFCFA`
- Top & bottom 1× inner stroke `#E1E8E1`
- Inner `Ticker Track`: 14815 px wide × 36 (overflowing for marquee animation via CSS)
- Individual `Ticker / Item`: width auto (~266 px shown); height **36 px**
  - Padding: **8 / 17 / 8 / 16** (top/right/bottom/left)
  - Right border separator (on each item): 1× inner stroke `#F0F5F0`
  - Layout: row-reverse, gap 6, 4 children (3 label texts + 1 dot separator typically)
  - **Font inside ticker items:** inferred from design-token usage (typically 12/400 or 14/500)

### 5.3 Hero Banner

**Outer Hero:** 1120 × 283, radius **24 px**, fill `#FAFCFA`, 1× inner stroke `#E1E8E1`, padding 1.

**Inner `Hero Content`** (space-between row): padding **40 / 16 / 40 / 16**, width 1118

**Hero Left column → Stack (576 × 217):** col gap = **8**, 6 items stacked:

| Stack order (top→bottom visually) | Item name            | Specs / font / color / bg                                                             |
| ---------------------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| 1 (top)                            | Eyebrow / Date pill  | Container 174×28; **padding 4/12/4/12**; **radius 14**; bg `#05893E` opacity **10 %**. Inside: text "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" → **14/500**, LH 1.4286 (~20), **#05893E** green 100% |
| 2                                  | Hero H1              | 477 × 45 → **36/700**, LH 1.25 → 45, **#1D271F**. Text: "আজকের বাজারের দাম এক নজরে" |
| 3                                  | Spacer 4 px          | (4 px vertical gap before subtitle)                                                   |
| 4                                  | Hero subtitle        | 576 × 48 → **16/400**, LH 1.5 (24), **#1D271F @ 70% opacity**. Long Bengali paragraph |
| 5                                  | Spacer 12 px         | (12 px vertical gap)                                                                  |
| 6 (bottom)                         | Primary CTA Grid     | 576 × 40 → rowGap 8, contains 1 Primary Button left-aligned                          |

**Hero Right image:** 315 × 263 placeholder frame named `bazar-hero 1` (transparent fill, for image). Matches reference `bazar-hero.png` resolution exactly!

#### Primary CTA Button ("সব পণ্য দেখুন")
| Property           | Exact value                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| min-height         | **40 px** (button 118.7 × 40)                                                                                 |
| H padding          | **17 px** left + 17 px right (layoutPadding: p1=1, p2=17, p3=1, p4=17 → 1px top/bottom, 17px L/R visual)       |
| V padding          | **1 px** top + 1 px bottom                                                                                    |
| borderRadius       | **8 px**                                                                                                      |
| Background         | `#05893E` (primary) 100% opacity                                                                              |
| Hover (token only) | hover.primary-border `#037333` pressed border; strong-primary as normal border                                |
| Stroke             | 1× inner `#047F39` (strong-primary)                                                                           |
| Text inside        | **14/600 SemiBold**, LH 1.5 → 21, **#F3FBF4** (primary-content). Text: "সব পণ্য দেখুন" (View All Products)    |
| Icon gap           | 6 px between text + chevron icon                                                                              |
| **Shadows**        | 3-layer box-shadow (see § 4.3 above)                                                                          |

### 5.4 Product Card

Card component used uniformly across Price Movers 1/2 grids and All Products 33-grid.

**Outer Product Card:**
- Size: **362.66 × 138 px** (3 cols → 362.66×3 + 2×16 gap = 1120 ✓)
- layoutPadding: 1/1/1/1 (outer "seam" to create stroke as 1px inset)
- borderRadius: **16 px** (all 4 corners r1→r4 = 16)
- Stroke: 1× inner solid `#E1E8E1` (base-300)
- Fill: `#FAFCFA` (base-100)
- **Shadow: NONE explicitly in file**
- appliedTokens: `fill: base-100, strokeColor: base-300`

**Card Body (inside):** 360.66 × 136
- Padding: **16 px on all sides** (top/right/bottom/left = 16/16/16/16)
- Column flex, rowGap: **12** (between upper row & lower price row)
- Two children rows:

**Row 1 (product + icon + name):** 328.66 × 48, row-reverse gap=12
- Left: Product icon square → **48 × 48**, borderRadius **12**, fill `#F0F5F0` (base-200), centered align (holds emoji/icon)
- Right: Name + unit Stack → 53 × 40 (flex-col, 2 children: product name 16/600 Bold-ish + unit weight)

**Row 2 (price + badge, space-between):** 328.66 × 44, align-items flex-end, justify-content space-between
- Left side: **Price Stack** (~67.2 × 44): 2 rows vertically — main price (e.g., 16/600 strong number + small per/kg caption 12/Regular).
- Right side: **Price Change Badge:**

  | Badge property       | Exact value                                         |
  | -------------------- | --------------------------------------------------- |
  | Size (shown sample)  | 63 × 24 px (auto-width, fixed h=24)                 |
  | Padding              | **4 / 8 / 4 / 8** (top/right/bottom/left)           |
  | borderRadius         | **12** (full pill)                                  |
  | Default fill         | `#F0F5F0` (base-200)                                |
  | Layout gap           | 4 px (between ▲/▼ icon + percentage text)           |

**Two badge colors (from section heading standalone ▲▼ tokens applied to card):**
- **▲ Price Increased badge (red):**
  - icon/text color → `#D03739` (error token), 16/400 SF Pro (fallback glyph). For surface use error-bg `#BD3133` low-opacity or `#FFF6F5` error-content light surface.
- **▼ Price Decreased badge (green):**
  - icon/text color → `#1A9951` (success token), 16/400 SF Pro (fallback glyph). For surface use primary 10% fill (#05893E1A) as the eyebrow pattern.

### 5.5 Grids (Cards)

| Grid name                     | cols × rows | total cards | card size (W×H)       | Column gap (px) | Row gap (px) | Container (W×H)      |
| ----------------------------- | ----------- | ----------- | --------------------- | --------------- | ------------ | -------------------- |
| Price Movers 1 ("বেড়েছে")    | 3 × 2       | 6           | 362.66 × 138          | 16              | 16           | 1120 × 292 (rows area)|
| Price Movers 2 ("কমেছে")      | 3 × 2       | 6           | 362.66 × 138          | 16              | 16           | 1120 × 292 (rows area)|
| **All Products ("সব পণ্য")**  | **3 × 11**  | **33**      | 362.66 × 138          | **16**          | **16**       | 1120 × 1678          |

> Verifications: 11 rows × 138 = 1518 + 10 row gaps × 16 = 160 → total height 1678 ✓. 3 cols × 362.66 = 1087.98 + 2 gaps × 16 = 32 → total 1119.98 ≈ 1120 ✓.

### 5.6 Footer

**Footer:** 1440 × 69.
- fill `#FAFCFA` (base-100), top border 1× #E1E8E1 (base-300).
- Inner content Row: 1152 × 68, centered (x:144). padding: **24/16/24/16**, justify-content `space-between`.

Two text items (left/right):

| Side | Text content snippet | Font              | Color      |
| ---- | -------------------- | ----------------- | ---------- |
| Left | `"বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।"` | 14/400 Regular, LH 1.4286 (~20) | `#1D271F` 100% |
| Right| `"সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।"` | 14/400 Regular | `#1D271F` 100% |

---

## 6. Media Assets

### 6.1 Embedded Penpot object

| Asset path in penpot extract                                                                 | Content type  | Size bytes | Decoded W×H (JSON metadata)                                  |
| -------------------------------------------------------------------------------------------- | ------------- | ---------- | ------------------------------------------------------------ |
| `objects/442c7c0e-28ac-80e5-8008-c02a9bbb5c88.webp` + metadata `media/…bbb5c89.json`          | `image/webp`  | **46,654** | **1024 × 1024 px** (media JSON: width=1024, height=1024, name hash `7eaae0…`) |

### 6.2 Reference files (B14-A7-Bazar-Dor-main repo)

| Reference file                                           | Resolution (from System.Drawing) | Compare with Penpot design box size |
| -------------------------------------------------------- | --------------------------------- | ----------------------------------- |
| `B14-A7-Bazar-Dor-main/logo-icon.png`                    | **18 × 18 px**                    | Placed in Nav Row 1 "Link" frame (189×44) next to brand → logo visually sized ~18×18 matches perfectly |
| `B14-A7-Bazar-Dor-main/bazar-hero.png`                   | **315 × 263 px**                  | Hero right image box is exactly 315 × 263 (frame `bazar-hero 1`) → **EXACT match, no resize needed** |

### 6.3 Size differences summary

- **bazar-hero.png** → reference (315×263) === design target box (315×263) → **PERFECT MATCH** ✅
- **logo-icon.png** → reference (18×18) === expected in-row usage (~18×18) → **PERFECT MATCH** ✅
- **Penpot webp object** is **1024×1024** square stock image / texture / generic packaged asset from extractor → not directly referenced in any frame's image placement. Likely an unused import; use reference PNG/JPG files for visible branding surfaces instead.

---

## 7. Appendix: Top shape name index across Home page

For quick lookup of any remaining frame-by-frame work, the largest three analyzed page JSON sections (Home / Product section / Hero) contain 100+ named shapes including: `Header`, `Row`, `Stack`, `Spacer`, `Ticker`, `Ticker Track`, `List`, `Ticker / Item`, `Hero`, `Hero Content`, `Grid`, `Text Block` (hero eyebrow), `Button / Primary`, `Section / Price Movers` (×2), `Section` (All Products parent), `Product Card`, `Card Body`, `Price Change Badge`, `Nav`, `Nav / Category Chip`, `Button / Ghost`, `Link`, `Footer`, `bazar-hero 1`, product-icon `Stack`, price + badge `Row`/`Stack`s, plus section heading ▲ and ▼.

All unknown/un-traversed deep children (33 cards × 6 sub-shapes, sign-in forms, profile settings interior, category listings) follow repeating `Product Card` / `Button / Primary` / `Nav / Category Chip` component bases already described above.

