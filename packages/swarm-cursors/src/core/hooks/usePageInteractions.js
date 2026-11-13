import { useCallback, useState } from "react";
import { NAV_HEIGHT, RULER_SIZE } from "../scene/theme.js";
import { ActionType } from "../interactions/actions.js";

/**
 * Handle nav / start / dialog actions. Scroll targeting uses `scrollRoot`
 * when provided (embed mode), otherwise `window`.
 *
 * @param {object|null} engine
 * @param {(action:object,engine:object)=>boolean|void} [onExternalAction]
 * @param {{current: HTMLElement|null}|null} [scrollRootRef]
 */
export function usePageInteractions(engine, onExternalAction, scrollRootRef = null) {
  const [dialog, setDialog] = useState(null);

  const onAction = useCallback(
    (action) => {
      if (!engine) return;
      if (onExternalAction?.(action, engine) === true) return;
      switch (action.type) {
        case ActionType.START:
          engine.start();
          break;
        case ActionType.SCROLL: {
          const target = action.target ? engine.els.get(action.target) : null;
          if (action.target && !target) return;
          engine.start();
          const offset = NAV_HEIGHT * engine.vp.s + RULER_SIZE + 24;
          const top = target ? Math.max(0, target.y * engine.vp.s - offset) : 0;
          const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          const opts = { top, behavior: reducedMotion ? "auto" : "smooth" };
          const root = scrollRootRef?.current ?? null;
          if (root) root.scrollTo(opts);
          else window.scrollTo(opts);
          break;
        }
        case ActionType.DIALOG:
          setDialog({ kind: action.kind, title: action.title, plan: action.plan });
          break;
        default:
          break;
      }
    },
    [engine, onExternalAction, scrollRootRef],
  );

  const closeDialog = useCallback(() => {
    setDialog(null);
  }, []);

  return { dialog, onAction, closeDialog };
}
