// content/lessons/index.js — the one place the app learns which lesson files exist.
//
// ADDING A LEVEL (full runbook: docs/EXTENDING.md):
//   1. create content/lessons/lN.js exporting `const LN = [...]`
//   2. import it here and add it to LESSON_SETS
//   3. add "./content/lessons/lN.js" to PRECACHE in sw.js and bump CACHE
//   4. add the path to V2_LESSON_FILES in tools/build_wordsnext.py
//   5. gate on `python -X utf8 tools/validate_lessons.py`
//
// Nothing else in js/ names a level: syllabus.js derives its level groups from
// the curriculum ids and lesson.js builds its body map from ALL_LESSONS.
import { L4 } from "./l4.js";
import { L5 } from "./l5.js";

// One entry per level file, in curriculum order.
export const LESSON_SETS = [L4, L5];

// Every authored lesson body, flattened. Order follows LESSON_SETS, which is
// also curriculum order — validate_lessons.py relies on that for its
// "bridges may only quote EARLIER material" check.
export const ALL_LESSONS = LESSON_SETS.flat();
