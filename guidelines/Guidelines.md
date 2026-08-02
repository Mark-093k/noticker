# Design System

This project uses the following design system packages. Please read them before anything else.

**MUST READ IN FULL**

- [ShadcnUiDesignSystemCommunity Guidelines](../src/ShadcnUiDesignSystemCommunity/guidelines/Guidelines.md) - @shadcn/ui - Design System (Community) guidelines

## Before applying styles

Before hardcoding a color, spacing, radius, font-size, or any other style
value, check the kit's stylesheet (imported per `setup.md`) for a CSS
custom property that fits — e.g. `--primary-button`, `--text-default`,
`--spacer-md`. Use the property via `var(--name)` (or the matching
Tailwind utility, if the kit defines one) rather than a raw hex / px /
rem value. Hardcoded values bypass the kit's theming and break dark mode,
re-skinning, and any future token changes.
