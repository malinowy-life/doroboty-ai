import { stateSchema, type State } from "./model";

// Authored synthetic scenario, not output from a repository analysis service.
export const evidenceApplicationId = "application-ai-builder";
export const projectDescription =
  "Pracowałem w trzyosobowym zespole nad asystentem AI dla obsługi klienta. Samodzielnie przygotowałem wczytywanie dokumentów, wyszukiwanie pasujących fragmentów oraz generowanie odpowiedzi ze wskazaniem źródeł. Odpowiadałem również za zestaw testów jakości. Interfejs i logowanie przygotowały pozostałe osoby. Udostępniam fragment produktu dotyczący wyszukiwania i odpowiedzi, bez danych klientów.";

/** Add the scoped example and repair only its untouched legacy seed timestamp. */
export function withWorkEvidenceScenario(state: State): State {
  const existing = state.applications.find((item) => item.id === evidenceApplicationId);
  if (existing) {
    const [submitted, reviewed] = existing.events;
    if (
      existing.candidateId === "candidate-ai-builder" &&
      existing.stage === "reviewed" &&
      existing.events.length === 2 &&
      submitted.stage === "submitted" &&
      submitted.at === "2026-11-06T09:00:00.000Z" &&
      reviewed.stage === "reviewed" &&
      reviewed.at === "2026-11-07T09:00:00.000Z" &&
      !submitted.note &&
      !reviewed.note
    ) {
      return stateSchema.parse({
        ...state,
        applications: state.applications.map((item) =>
          item.id === evidenceApplicationId
            ? { ...item, events: [submitted, { ...reviewed, at: "2026-11-06T10:00:00.000Z" }] }
            : item,
        ),
      });
    }
    return state;
  }
  if (state.people.length >= 100 || state.applications.length >= 2000) return state;
  const job = state.jobs.find((item) => item.id === "20000000-0000-4000-8000-000000000002");
  if (!job) return state;
  const candidateId = "candidate-ai-builder";
  if (state.people.some((item) => item.id === candidateId)) return state;
  const cv =
    "Kuba Wójcik — AI Builder\nBuduję asystentów opartych na modelach językowych i dokumentach. Pracuję w Pythonie, integruję API i przygotowuję ewaluacje odpowiedzi. W trzyosobowym zespole odpowiadałem za wyszukiwanie, generowanie odpowiedzi i testy asystenta dla obsługi klienta.";
  return stateSchema.parse({
    ...state,
    people: [
      ...state.people,
      {
        id: candidateId,
        role: "candidate",
        name: "Kuba Wójcik",
        headline: "AI Builder · asystenci i wyszukiwanie w dokumentach",
        bio: "Buduję produkty AI oparte na wiedzy organizacji.",
        location: "Warszawa",
        cv,
        exampleScore: 72,
        exampleSummary:
          "Doświadczenie w integracji modeli i wyszukiwaniu w dokumentach. Do rozmowy: utrzymanie produktu i odpowiedzialność na poziomie Staff.",
      },
    ],
    applications: [
      ...state.applications,
      {
        id: evidenceApplicationId,
        candidateId,
        jobId: job.id,
        companyId: job.companyId,
        jobTitle: job.title,
        candidateName: "Kuba Wójcik",
        cv,
        answer: projectDescription,
        sourceNotes: "",
        generatedAnswer: "",
        score: 72,
        summary:
          "Próbka częściowo potwierdza dopasowanie. Pokazuje integrację modeli i pracę ze źródłami; nie potwierdza jeszcze utrzymania usług produkcyjnych.",
        stage: "reviewed",
        events: [
          { stage: "submitted", at: "2026-11-06T09:00:00.000Z", note: "" },
          { stage: "reviewed", at: "2026-11-06T10:00:00.000Z", note: "" },
        ],
      },
    ],
  });
}

export const evidenceAreas = [
  {
    title: "Integracja modeli i wyszukiwanie w dokumentach",
    status: "Potwierdzone",
    tone: "confirmed",
    heading: "Rozwiązanie łączy wyszukiwanie z odpowiedzią opartą na źródłach.",
    detail:
      "W kodzie widać pobranie fragmentów z wyszukiwarki, przekazanie ich do modelu i zwrócenie listy źródeł. To potwierdza obecność mechanizmu integracji. Nie dowodzi trafności wyszukiwania ani poprawności wygenerowanej odpowiedzi.",
    source: "Przepływ odpowiedzi",
    excerpt:
      "Pytanie użytkownika → wyszukanie fragmentów dokumentów → odpowiedź modelu na podstawie fragmentów → odpowiedź z odnośnikami do źródeł.",
  },
  {
    title: "Ocena jakości odpowiedzi",
    status: "Częściowo potwierdzone",
    tone: "partial",
    heading: "Kandydat uwzględnił testy odpowiedzi, ale zakres oceny jest niepełny.",
    detail:
      "W pliku testów widać dwa przypadki: brak dokumentów oraz przekazanie kontekstu i dołączenie źródła. Model jest zastąpiony przygotowaną odpowiedzią, więc testy nie sprawdzają jakości prawdziwego AI. Brakuje oceny na osobnym zestawie pytań i porównania wyników po zmianie modelu — obu wymaga Northstar.",
    source: "Zakres testów",
    excerpt:
      "tests/test_answers.py: test_no_documents_does_not_call_model i test_passes_context_and_returns_source. Model i wyszukiwarka są zastąpione atrapami. Poza zakresem materiału: oddzielny zestaw kontrolny i porównanie wersji modelu.",
  },
  {
    title: "Utrzymanie usług produkcyjnych",
    status: "Brak potwierdzenia",
    tone: "missing",
    heading: "Próbka nie pokazuje, jak produkt działa po wdrożeniu.",
    detail:
      "Materiały nie zawierają pomiarów kosztu i czasu odpowiedzi, opisu obsługi awarii ani incydentów. To wymagania istniejącego ogłoszenia. Brak takich materiałów nie oznacza, że kandydat nie ma tego doświadczenia.",
    source: "Zakres udostępnionego materiału",
    excerpt:
      "Udostępniony zakres: wyszukiwanie, generowanie odpowiedzi, testy. Materiał nie obejmuje monitoringu, historii incydentów ani wyników pracy u klientów.",
  },
];
