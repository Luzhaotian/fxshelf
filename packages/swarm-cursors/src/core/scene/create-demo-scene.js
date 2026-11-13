import { SceneBuilder } from "./scene-builder.js";
import { createNavigation } from "./sections/navigation.js";
import { createHero } from "./sections/hero.js";
import { createFeatures } from "./sections/features.js";
import { COLORS, TEXT_STYLES, CONTENT_LEFT, monoStyle } from "./theme.js";

/** Compact scene height for shelf cards and docs embeds. */
export const DEMO_PAGE_HEIGHT = 1680;

/**
 * Short swarm scene: nav + hero + features + closing line.
 * @param {() => number} getWorkerCount
 * @returns {{els:object[],tasks:object[],groups:object[],height:number}}
 */
export function createDemoScene(getWorkerCount) {
  const scene = new SceneBuilder();
  createNavigation(scene);
  createHero(scene);
  createFeatures(scene);

  scene.frame("closing", 1480, 120);
  scene.text(
    "closing-title",
    CONTENT_LEFT,
    1520,
    "Built by a swarm of cursors.",
    TEXT_STYLES.h2,
    { w: 720 },
  );
  scene.text(
    "closing-body",
    CONTENT_LEFT,
    1588,
    "",
    monoStyle(15, COLORS.muted),
    {
      w: 640,
      dyn: () =>
        `${getWorkerCount()} workers sketched this page — scroll to keep building.`,
    },
  );

  return {
    els: scene.elements,
    tasks: scene.tasks,
    groups: scene.groups,
    height: DEMO_PAGE_HEIGHT,
  };
}
