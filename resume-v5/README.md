# Resume v5 — all variants, pre-built

Built 2026-07-27 from the v5 draft. Nothing here is live: the site still serves
the old `public/resume.pdf` (Enhancv, 2 pages, no Imperia OS). Pick one file
below and the swap is a single commit.

## The three axes

1. **A vs B** — position of the self-building paragraph ("The platform is written
   from inside itself…").
   - **A**: it is the FIRST body paragraph, right after the lead/sub-lead — the
     reader meets "the system writes itself" before anything else.
   - **B**: the memory block opens the body (memory → graph → thoughts → state)
     and the self-building paragraph lands AFTER the state-machine paragraph, as
     the payoff of the architecture just described.
   Same 14 paragraphs, same wording — only the order differs.

2. **2p vs 3p**
   - **2p**: 11 body paragraphs at base 9pt / line-height 1.35. Three paragraphs
     are cut, in this order: `paid`, `prompt`, `reuse`.
   - **3p**: all 14 body paragraphs at the drafted base 10pt / line-height 1.4.
     Nothing cut.

3. **EN / RU / ENRU** — separate language files, or one combined file (EN pages
   first, then RU).

## Files

| File | Pages | Bytes |
| --- | --- | --- |
| `Yegor_Polyakov_Resume_v5_EN_A_2p.pdf` | 2 | 22451 |
| `Yegor_Polyakov_Resume_v5_EN_B_2p.pdf` | 2 | 22436 |
| `Yegor_Polyakov_Resume_v5_EN_A_3p.pdf` | 3 | 24162 |
| `Yegor_Polyakov_Resume_v5_EN_B_3p.pdf` | 3 | 24144 |
| `Yegor_Polyakov_Resume_v5_RU_A_2p.pdf` | 2 | 27005 |
| `Yegor_Polyakov_Resume_v5_RU_B_2p.pdf` | 2 | 26998 |
| `Yegor_Polyakov_Resume_v5_RU_A_3p.pdf` | 3 | 29004 |
| `Yegor_Polyakov_Resume_v5_RU_B_3p.pdf` | 3 | 29004 |
| `Yegor_Polyakov_Resume_v5_ENRU_A_2p.pdf` | 4 | 49379 |
| `Yegor_Polyakov_Resume_v5_ENRU_B_2p.pdf` | 4 | 49357 |
| `Yegor_Polyakov_Resume_v5_ENRU_A_3p.pdf` | 6 | 53266 |
| `Yegor_Polyakov_Resume_v5_ENRU_B_3p.pdf` | 6 | 53248 |

Every file verified after build: page count as stated, "Imperia OS" present in
the extracted text, rendered in Inter-Regular (no font fallback), A4.

## Swapping it in

One line, one file — `app/[locale]/resume/page.tsx:48`:

```tsx
href="/resume.pdf"
```

Keep the href and replace the bytes:

```sh
cp resume-v5/<chosen>.pdf public/resume.pdf
```

The download filename is the next line, `page.tsx:49`
(`download="YegorPolyakovResume.pdf"`) — change it only if the chosen file is
the combined EN+RU one and the name should say so.

If EN and RU stay SEPARATE files, the page needs a second link, so that is the
one option that is not a pure byte swap.

## Rebuilding

Source of truth is the builder, not these PDFs:
`/home/deploy/apps/imperiaos-coord/scratch/resume/` (`build.mjs`, `content.mjs`,
`v5-draft.md`, `Inter-Regular.woff2`). Run from the `imperiaos-coord` repo root
so `playwright` resolves:

```sh
# 2-page, dense (auto-cuts until it fits)
node scratch/resume/build.mjs --lang=en --variant=a --max-pages=2
node scratch/resume/build.mjs --lang=ru --variant=b --max-pages=2

# 3-page, full body, drafted typography
node scratch/resume/build.mjs --lang=en --variant=a --cuts= --max-pages=3 --base=10 --lh=1.4

# combined
pdfunite <EN>.pdf <RU>.pdf <ENRU>.pdf
```
