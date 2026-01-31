# Specification: Conductor Install Banner Creation

## Overview
Create a new `conductor_install_banner.png` image for the project README to visually represent the "Conductor Install" brand identity, while preserving the existing banner file.

## Functional Requirements
1.  **Asset Generation:**
    -   Create a distinct image file named `conductor_install_banner.png`.
    -   **Text Content:** "Conductor Install".
    -   **Design Style:** **Technical & Dark**. Terminal-inspired aesthetics, monospaced fonts, dark background with neon accents (green/cyan).
    -   **Dimensions:** 1280x640 pixels (2:1 aspect ratio).

2.  **File Management:**
    -   **Preserve:** Ensure the existing `conductor_banner.png` is NOT deleted or overwritten.

3.  **Documentation Update:**
    -   Update `README.md` to reference the new `conductor_install_banner.png` image source.

## Non-Functional Requirements
-   **Format:** PNG.
-   **Optimization:** Ensure the file size is reasonable for web loading.

## Out of Scope
-   Deleting the old banner file.
