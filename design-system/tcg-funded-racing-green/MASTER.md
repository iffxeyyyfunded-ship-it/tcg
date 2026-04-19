# Design System Master File — TCG Funded (Racing Green)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** TCG Funded (Racing Green)
**Generated:** 2026-04-19 06:33:00
**Category:** High-Performance Fintech / Racing Inspired

---

## Global Rules

### Color Palette (MANDATORY)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background Primary | `#0A0A0A` | `--color-bg-primary` |
| Background Surface | `#111111` | `--color-bg-surface` |
| Background Card | `#1A1A1A` | `--color-bg-card` |
| Background Elevated | `#222222` | `--color-bg-elevated` |
| Primary Accent (Green) | `#00C896` | `--color-primary-accent` |
| Primary Dark | `#00A878` | `--color-primary-dark` |
| Border Default | `#222222` | `--color-border-default` |
| Border Hover | `#333333` | `--color-border-hover` |
| Border Accent (30% Green) | `#00C8964D` | `--color-border-accent` |
| Text Primary | `#FFFFFF` | `--color-text-primary` |
| Text Secondary | `#AAAAAA` | `--color-text-secondary` |
| Text Muted | `#666666` | `--color-text-muted` |
| Danger | `#FF4444` | `--color-danger` |
| Warning | `#F59E0B` | `--color-warning` |

**Note:** NO box-shadows. Use border glow: `box-shadow: 0 0 0 1px #00C89633`.

### Typography

- **Font family:** `Inter, system-ui, sans-serif`
- **Display Headline:** 700 weight, 56-80px, `-0.03em` tracking, `#FFFFFF`
- **Section Headline:** 700 weight, 32-48px, `-0.02em` tracking
- **Card Title:** 600 weight, 20-24px
- **Body:** 400 weight, 16px, `1.6` line-height, `#AAAAAA`
- **Mono (Data):** `JetBrains Mono`, for numbers/prices/stats
- **Labels:** 500 weight, 11px, `0.08em` tracking, UPPERCASE, `#666666`

---

## Component Specs

### Cards
- **Background:** `#1A1A1A`
- **Border:** `0.5px solid #222222`
- **Border-radius:** `12px`
- **Padding:** `24px`
- **Hover:** border-color: `#333333`, `translateY(-1px)`
- **Glow:** `box-shadow: 0 0 0 1px #00C89633`

### Buttons — Primary
- **Background:** `#00C896`
- **Color:** `#000000` (Text on Green)
- **Font-weight:** `600`
- **Border-radius:** `8px`
- **Padding:** `12px 24px`
- **Hover:** background: `#00A878`
- **NO border**

### Buttons — Secondary/Outline
- **Background:** `transparent`
- **Border:** `1px solid #333333`
- **Color:** `#FFFFFF`
- **Hover:** `border-color: #00C896`, `color: #00C896`

### Tables
- **Background:** `#111111`
- **Header:** `#0A0A0A` background, `#666666` text, uppercase, `11px`
- **Rows:** `0.5px solid #1A1A1A` border
- **Green Cells:** `#00C896` text

### Forms / Inputs
- **Background:** `#111111`
- **Border:** `0.5px solid #333333`
- **Focus:** `border-color: #00C896`, `box-shadow: 0 0 0 2px #00C89633`

---

## Anti-Patterns (Do NOT Use)

- ❌ White or light backgrounds
- ❌ Box-shadows (elevation shadows)
- ❌ Gradients (except the specific promo bar)
- ❌ Serif fonts
- ❌ Rounded corners > 16px
- ❌ Emojis as icons (use Circle Icon: `#00C89615` bg, `#00C896` color)

---

## Pre-Delivery Checklist

- [ ] Every pixel is Racing Green compatible?
- [ ] Headlines use `-0.03em` tracking?
- [ ] No emojis as icons?
- [ ] All clickable elements have `cursor-pointer`?
- [ ] Data uses Monospace?
