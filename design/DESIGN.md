# Design System Document

## 1. Overview & Creative North Star: "The Sonic Ledger"

This design system is a manifestation of **Sonic Brutalism**. It rejects the soft, approachable "app-ness" of modern software in favor of the raw, rhythmic authority of Swiss International Style and underground music zines. By utilizing a strictly binary color palette, we strip away the noise to focus on the essential: the artist, the venue, and the time.

**The Creative North Star: The Sonic Ledger.**
The layout should feel less like a mobile interface and more like a high-end editorial poster that has been digitized. We break the "standard template" look through **intentional asymmetry**, where large-scale typography and heavy-stroked containers create a modular grid that feels architectural and permanent.

---

## 2. Colors: Pure Contrast

This system operates on a zero-compromise binary scale. While technical tokens exist, their implementation is restricted to high-contrast interactions.

*   **Primary (#000000) & Surface (#FFFFFF):** These are the only two states. There is no middle ground. 
*   **The "Inversion" Rule:** Depth is not achieved through shadows, but through total color inversion. If a container sits on a `surface` (#FFFFFF), its child elements or high-priority CTAs should be solid `primary` (#000000) with `on-primary` (#FFFFFF) text.
*   **The "Heavy Border" Logic:** Every interactive container or primary section must be defined by a **2px or 4px solid #000000 border**. This replaces the need for "standard" UI separation. 
*   **Signature Textures (Halftone):** To provide the "visual soul" required of high-end design without introducing grays, use high-contrast halftone patterns (dithering) for image overlays or background interest. This maintains the #000000/#FFFFFF constraint while adding tonal depth.

---

## 3. Typography: Space Grotesk

The choice of **Space Grotesk** is central to our Swiss-inspired identity. It provides a mathematical, mono-linear quality that feels engineered and objective.

*   **Display Scale:** Use `display-lg` (3.5rem) and `display-md` (2.75rem) for artist names and event titles. Do not be afraid to let these elements bleed off the edge of the screen or overlap with heavy borders to create a sense of scale.
*   **The Headline Hierarchy:** `headline-lg` is for primary navigation and section headers. These should always be uppercase to reinforce the brutalist aesthetic.
*   **Labeling as Metadata:** `label-sm` and `label-md` should be treated like technical specs on a blueprint—small, sharp, and often tucked into the corners of the heavy-bordered containers.

---

## 4. Elevation & Depth: Stacking and Borders

We reject the concept of "z-axis" lighting. In this design system, depth is a matter of **Layered Information Architecture**.

*   **The Layering Principle:** Depth is achieved by "stacking" blocks. To elevate an element, we do not use shadows; we use a **"Solid Offset."** Place a primary-colored block (#000000) 4px to the right and bottom behind a bordered container to create a "hard shadow" that feels physical and graphic.
*   **The "Zero-Radius" Mandate:** All tokens are set to **0px**. Any rounding is a violation of the system. This applies to buttons, inputs, cards, and even the logic of image cropping.
*   **High-Contrast Layering:** Instead of Glassmorphism (which requires grays), we use **"Stark Layering."** Use 100% opaque layers that partially obscure one another. This "pasted-on" look mimics the physical nature of gig posters and street wheat-pasting.

---

## 5. Components

### Buttons
*   **Primary:** Solid #000000 fill with #FFFFFF Space Grotesk Bold text. No rounding. 2px offset "hard shadow" for the hover state.
*   **Secondary:** #FFFFFF fill with a 2px #000000 border.
*   **States:** On press, the button should invert (Primary becomes Secondary).

### Input Fields
*   **Default:** A simple 2px bottom-border or full rectangle. Labeling is positioned inside the top-left corner of the border using `label-sm`.
*   **Focus:** The border weight increases from 2px to 4px. No "glow" or color change.

### Cards & Event Lists
*   **The "No-Divider" Rule:** Never use a thin gray line. To separate list items, either use a 2px black border around every item (creating a "stack of bricks") or alternate the background color (Inversion) between #FFFFFF and #000000.
*   **Image Handling:** Photos must be processed with high-contrast thresholds or halftone filters to ensure they fit the strictly B&W aesthetic.

### Tickets & QR Codes
*   These are the "Hero" components. Use the **GigHub Logo (The Robot)** as a large, 20% opacity "watermark" background for ticket surfaces to ensure brand recall in a high-utility moment.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Whitespace:** Use massive gaps between elements to let the typography breathe. Swiss design relies on the tension between the void and the content.
*   **Use Intentional Asymmetry:** Align text to the far left and CTA buttons to the far right. Break the center-alignment habit.
*   **Scale the Logo:** The GigHub logo is character-rich; use it as a massive anchor in the header or a "stamp" of authenticity on event cards.

### Don’t:
*   **Don't use Grays:** Even for "disabled" states. Use a diagonal "hatch" pattern or a 50% opacity dithered black to indicate inactivity.
*   **Don't use 1px lines:** They appear "weak" in a brutalist system. Stick to 2px, 4px, or 8px increments.
*   **Don't use Softness:** No shadows, no blurs, no round corners. If it feels "nice," it’s likely wrong for this system. It should feel **bold and undeniable.**

---

*Director's Final Note: This design system is about the "Volume" of the visual. Like a wall of Marshall amps at a concert, it should feel imposing, loud, and perfectly structured.*