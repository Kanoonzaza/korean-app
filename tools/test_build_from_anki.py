"""Run: python -X utf8 tools/test_build_from_anki.py  (from repo root)"""
import json, re, subprocess, sys, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
subprocess.run([sys.executable, "-X", "utf8", str(root/"tools/build_from_anki.py")], check=True)

def load_js_array(path, name):
    txt = pathlib.Path(path).read_text(encoding="utf-8")
    m = re.search(rf"export const {name}\s*=\s*(\[.*?\]);", txt, re.S)
    assert m, f"{name} not found in {path}"
    return json.loads(m.group(1))

known = root/"content/known.js"; sent = root/"content/ttmik-sentences.js"
tt = load_js_array(known, "KNOWN_TTMIK")
core = load_js_array(known, "KNOWN_CORE5K")
sents = load_js_array(sent, "TTMIK_SENTENCES")

assert 650 <= len(tt) <= 780, len(tt)            # ~709 distinct TTMIK words
assert 4900 <= len(core) <= 5100, len(core)      # 4,996 Core 5k words
assert 1400 <= len(sents) <= 1700, len(sents)    # ~1,550 sentences
assert "가능하다" in tt and "네" in core
assert all(set(s) >= {"ko", "en", "lesson"} for s in sents[:50])
assert any("안녕하세요" in s["ko"] for s in sents)
assert not any("<" in s["ko"] or "[sound:" in s["ko"] for s in sents)  # HTML stripped
assert all(re.fullmatch(r"\d+\.\d+|", s["lesson"]) for s in sents)     # "2.17" or ""
assert len(tt) == len(set(tt)) and len(core) == len(set(core))         # deduped
print("ALL PASS")
