# Work-evidence decision summary

## Intent and scope

Implement the accepted compact employer section with an immediately visible fit conclusion, three requirement statuses, contribution/quality summary, details disclosure, and follow-up questions outside the modal. Use the existing Northstar Staff AI Engineer vacancy and employer Tomasz. Add synthetic AI builder Kuba as a separate application, preserving existing records and active user. Existing non-scenario applications retain their actual project description and do not receive this report.

## Content provenance

All report conclusions, material excerpts and candidate details are authored scenario content. No AI or repository analysis is executed, and no real repository, commit history, test output or expert validation was supplied. The UI has no simulated processing or fake repository links. Source disclosures show the prepared description/excerpts. This supports comprehension testing only, not measurement of assessment accuracy. The user explicitly requested no demonstration labels in the screen.

## Implementation and acceptance

Reuse RecordSheet, Base UI Dialog and Button, source C01/C18/C22 with scoped host styles. Preserve hash routing, company authorization, notes and stage actions. Seed the scoped example idempotently on valid store initialization/reset, without replacing existing records or blocked recovery data. Import remains unchanged. The current active user is changed through the existing sign-in UI for preview.

Verify formatting, kit, lint, types, unit tests, package and build using scripts/verify; report browser environment limitations. Inspect the main section, both dialogs, source disclosures and Escape focus. Keep the evidence area readable on narrow widths; use text statuses, not color alone.

## Verification results

Formatting, design-system integrity (67 files), lint, types, 29 unit tests, participant packet and production build passed. The default browser gate could not bind port 3106 in the sandbox. An elevated run using installed Chrome executed the 34 existing journeys: 30 passed; two PDF checks counted Chrome's internal PDF-extension URLs as external requests, and two context tests encountered trace-file deletion from the parallel layout audit. Those two context tests were rerun separately with an isolated output directory (see recheck.log).

The task-specific browser audit passed at 1440, 390 and 320px: no horizontal overflow, source disclosure works, Escape restores focus, and the recruiter note survives the modal. Manual in-app inspection confirmed the project dialog, main verdict and details, and left Tomasz viewing Kuba's application. Screenshots and exact logs are in artifacts/work-evidence-fragment/. Prepared content remains unvalidated against a real repository.

## Answer-tab placement correction

Move the employer work-evidence section into the Answer panel via an optional ApplicationRecord answerSupplement slot. It must not appear in CV. Keep recruiter note and stage actions outside both panels so switching tabs preserves editing. Candidate records do not supply the slot. Verify both tabs and run the project gate; no new tests are necessary for this presentational placement correction.

## Raw submission instead of editorial description

The project modal now displays an authored candidate message and four expandable raw files: README, Python answer function, mock-based tests and a sample document. No real repository was fetched. Assessment copy explicitly distinguishes mocked contract tests from actual model-quality evaluation. Reuse the existing modal and native disclosures; retain other applications' actual submitted answer.

## Compact verdict typography

Remove the redundant role eyebrow, rename the source action to “Zobacz materiał”, and reduce the verdict heading from 28/25px to 23/22px (desktop/mobile) and its supporting paragraph from 14px to 13px. Other section typography remains unchanged. Verify in the open prototype and run the project gate.

The verdict heading was reduced again at the user's request to 18px on desktop and mobile, with 1.4 line height. No behavior changes; FEATURES.md remains accurate.

## Simplify the summary

Remove the explanatory missing-evidence caption and the contribution/quality two-column summary as requested. Keep the requirement statuses, details action and questions. Detailed rationale stays available in the modal. Preserve spacing before the details action.

## Remove the empty strip before recruiter notes

The work-evidence bottom border/margin/padding combined with the supplement wrapper and reading panel bottom padding created a blank strip between follow-up questions and recruiter notes. Remove that redundant separation and bottom padding only for the answer supplement. Keep the existing note divider and its top padding. Also prepare a Polish participant-facing prototype description covering the actual Northstar/Kuba scenario, intended user outcome, and authored versus working behavior.

## Overall partial-fit status

Replace the redundant verdict sentence heading with a compact 16px semibold “Częściowe dopasowanie” label and decorative amber dot. Use the same pale-yellow surface (#fff0ce) as partial requirement statuses. Preserve the explanation, detailed statuses and authored-data scope; no inferred percentage or automatic aggregation. Color supplements the explicit text label. Update the Polish project description and behavior register.

## Move requirement statuses into details

Keep only the overall verdict “Dopasowanie — częściowo potwierdzone” and explanation in the main verdict area. Move the three requirement status rows to the top of the review dialog. Preserve source material access and visible follow-up questions. Update the register and Polish description to match this placement.

## Highlight only the partial status

Correct the visual interpretation: remove the large verdict surface, outline and inset padding. Display “Dopasowanie —” followed by the existing partial-status badge; only “częściowo potwierdzone” receives yellow fill. Remove the decorative dot and allow the heading row to wrap on narrow screens. Keep the explanation beneath it.

## Align the verdict status

Remove the dash after “Dopasowanie” and right-align its partial-status badge within the verdict heading row. Keep wrapping for narrow widths. No behavior change; the behavior register remains accurate.

## Accepted UX review refinements

Place the partial-status badge next to “Dopasowanie próbki do roli”, shorten the explanation and rename the details action to “Zobacz uzasadnienie”. Replace generic follow-up questions with project-specific questions about search/answer authorship, real-model quality and deployment issues. Remove the duplicate requirement overview in the modal; show each requirement once with its status, conclusion and expandable basis. Distinguish candidate declarations from visible code and mocked contract tests from model quality. No analysis or scoring logic changes.

## Integration journey audit

User requested verification against the existing recruitment flow. Add browser regressions for the Northstar list-to-application path, raw materials, CV exclusion, evidence rationale, preservation of note drafts across tabs/dialogs, saving notes with stages, reload persistence, terminal stage behavior, company boundaries and candidate note privacy. Run at desktop/mobile with scoped serious/critical Axe checks. Tests use isolated browser contexts and must not change the user's open scenario.

### Integration defect found and fixed

All three new journeys exposed a genuine stage-transition failure: the authored reviewed event was dated 2026-11-07 09:00 UTC, later than the machine's current time during this session. Chronological history validation rejected saving an invitation and its note. Change the seed review event to 2026-11-06 10:00 UTC. On initialization, repair only the exact untouched legacy two-event seed; preserve user-written notes and progressed histories. Add unit coverage proving invitation before the former future timestamp and non-mutation of user history. Keep domain chronology validation intact.

### Integration verification outcome

After the timestamp fix: 9/9 targeted browser journeys passed on installed Chrome, including all 3 new work-evidence journeys plus 6 existing note, privacy, import/recovery and snapshot regressions. Desktop 1280px and mobile 390px passed the complete review-to-decision path and serious/critical Axe checks for the record and rationale modal. 31 unit tests, formatting, lint, types, kit integrity, packet verification and build passed. The default script's browser step remains sandbox-port blocked; the scoped elevated browser run succeeded with an isolated output directory. Logs: integration-fixed.log and integration-fixed-verify.log. The user's open application remains in review; its seed history now shows the corrected date and no test decision was written to it.
