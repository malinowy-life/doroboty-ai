import { describe, expect, it } from "vitest";
import { initialState, stateSchema, transition } from "./model";
import { evidenceApplicationId, withWorkEvidenceScenario } from "./work-evidence-scenario";

describe("work evidence scenario", () => {
  it("preserves existing records and user while adding a valid Northstar application once", () => {
    const original = initialState();
    original.activePersonId = "employer-brightlabs";
    const next = withWorkEvidenceScenario(original);
    expect(next.activePersonId).toBe(original.activePersonId);
    expect(next.applications[0]).toEqual(original.applications[0]);
    expect(original.applications).toHaveLength(1);
    expect(stateSchema.safeParse(next).success).toBe(true);
    const application = next.applications.find((item) => item.id === evidenceApplicationId)!;
    expect(application.companyId).toBe(
      next.people.find((item) => item.id === "employer-northstar")!.companyId,
    );
    expect(withWorkEvidenceScenario(next)).toBe(next);
  });
  it("does not invent a vacancy in an imported state without the target job", () => {
    const state = initialState();
    state.jobs = state.jobs.filter((item) => item.title !== "Staff AI Engineer");
    expect(withWorkEvidenceScenario(state)).toBe(state);
  });
});

it("repairs the untouched legacy timestamp and permits a decision before its former future time", () => {
  const saved = withWorkEvidenceScenario(initialState());
  saved.activePersonId = "employer-northstar";
  const legacy = saved.applications.find((item) => item.id === evidenceApplicationId)!;
  legacy.events[1].at = "2026-11-07T09:00:00.000Z";
  const repaired = withWorkEvidenceScenario(saved);
  expect(legacy.events[1].at).toBe("2026-11-07T09:00:00.000Z");
  const decided = transition(
    repaired,
    {
      type: "stage",
      applicationId: evidenceApplicationId,
      stage: "interview_invited",
      note: "Sprawdzić utrzymanie.",
    },
    "2026-11-07T07:00:00.000Z",
  );
  expect(decided.applications.find((item) => item.id === evidenceApplicationId)!.stage).toBe(
    "interview_invited",
  );
  expect(withWorkEvidenceScenario(decided)).toBe(decided);
});
it("does not rewrite user-authored history", () => {
  const saved = withWorkEvidenceScenario(initialState());
  const record = saved.applications.find((item) => item.id === evidenceApplicationId)!;
  record.events[1].at = "2026-11-07T09:00:00.000Z";
  record.events[1].note = "Własna notatka";
  expect(withWorkEvidenceScenario(saved)).toBe(saved);
});
