# Step 1: Layout Stability (Skeletons)

## Goal
Prevent layout shifts and improve perceived performance during the initial load.

## Challenge
The current app shows a centralized spinner (`ActivityIndicator`) while data is loading. When the data arrives, the entire UI "pops" into place, shifting the layout instanly. This creates a jarring user experience.

## Acceptance Criteria
1.  **Zero Layout Shift**: The structure displayed during loading must match the dimensions of the loaded content (Header, Image, Text block).
2.  **Perceived Performance**: The user should see a "shell" of the application immediately.
3.  **Visual Polish**: The loading state should look intentional (e.g., gray placeholders), replacing the generic spinner.

## Implementation Tasks
1.  Design a component that mimics the geometric structure of the Feed Item.
2.  Refactor the loading logic in the Feed to render this structure instead of the default spinner.
    *   *Note: You do not need complex animation libraries; standard Views are sufficient.*


