// Authored raw submission for the synthetic AI-builder scenario, not a fetched repository.
const files = [
  {
    name: "README.md",
    content: `# Support Docs Assistant

Asystent dla zespołu obsługi klienta. Odpowiada na pytania na podstawie
wewnętrznych instrukcji i pokazuje dokumenty użyte w odpowiedzi.

## Moja część
Zrobiłem import dokumentów, wyszukiwanie fragmentów, integrację z modelem
oraz testy odpowiedzi. UI i logowanie przygotowali inni członkowie zespołu.
Pracowaliśmy w trzy osoby. Ten wycinek zawiera tylko warstwę odpowiedzi.

## Przepływ
Pytanie → wyszukanie 4 fragmentów → model → odpowiedź i źródła.
Jeśli nie znajdziemy dokumentów, nie pytamy modelu.

## Testy
pytest tests/test_answers.py
Testy używają atrap wyszukiwarki i modelu. Sprawdzają brak dokumentów,
przekazanie kontekstu oraz dołączenie źródła. Nie mierzą jeszcze
prawdziwej jakości odpowiedzi modelu. Osobny zestaw ewaluacyjny: TODO.

## Zakres udostępnienia
Dołączyłem przykładowy dokument bez danych klientów.
Nie dołączam kodu UI, infrastruktury, monitoringu ani historii wdrożeń.
Nie mam w tym materiale pomiaru oszczędności czasu użytkowników.`,
  },
  {
    name: "src/answers.py",
    content: `def answer(question, retriever, model):
    chunks = retriever.search(question, limit=4)
    if not chunks:
        return {
            "text": "Nie znalazłem odpowiedzi w dokumentacji.",
            "sources": [],
        }

    context = "\\n\\n".join(chunk["text"] for chunk in chunks)
    text = model.generate(
        instruction=(
            "Odpowiedz tylko na podstawie kontekstu. "
            "Jeśli nie ma odpowiedzi, powiedz o tym wprost."
        ),
        question=question,
        context=context,
    )
    return {
        "text": text,
        "sources": [chunk["source"] for chunk in chunks],
    }`,
  },
  {
    name: "tests/test_answers.py",
    content: `from unittest.mock import Mock
from src.answers import answer


def test_no_documents_does_not_call_model():
    retriever = Mock()
    retriever.search.return_value = []
    model = Mock()

    result = answer("Jak zmienić plan?", retriever, model)

    assert result["sources"] == []
    assert "Nie znalazłem" in result["text"]
    model.generate.assert_not_called()


def test_passes_context_and_returns_source():
    retriever = Mock()
    retriever.search.return_value = [{
        "text": "Zmiana planu: Ustawienia > Plan.",
        "source": "docs/plan.md",
    }]
    model = Mock()
    model.generate.return_value = "Otwórz Ustawienia > Plan."

    result = answer("Jak zmienić plan?", retriever, model)

    assert result["sources"] == ["docs/plan.md"]
    assert model.generate.call_args.kwargs["context"] == (
        "Zmiana planu: Ustawienia > Plan."
    )`,
  },
  {
    name: "docs/plan.md",
    content: `# Zmiana planu

Administrator może zmienić plan w Ustawienia > Plan.
Nowy plan obowiązuje od następnego okresu rozliczeniowego.
Jeśli przycisk jest niedostępny, skontaktuj się z administratorem konta.`,
  },
];

export function WorkSampleMaterial() {
  return (
    <div className="work-sample-material">
      <h3>Wiadomość od Kuby</h3>
      <blockquote>
        Cześć! Przesyłam wycinek asystenta, nad którym pracowałem. W README opisałem moją część i
        to, czego tutaj nie ma. Poniżej kod odpowiedzi, dwa testy i przykładowy dokument. Mogę na
        rozmowie przejść przez decyzje i pokazać szerszy kontekst projektu.
      </blockquote>
      <h3>support-docs-assistant /</h3>
      <p className="work-evidence-caption">4 pliki przesłane ze zgłoszeniem</p>
      {files.map((file, index) => (
        <details className="work-sample-file" key={file.name} open={index === 0}>
          <summary>{file.name}</summary>
          <pre tabIndex={0} aria-label={`Zawartość pliku ${file.name}`}>
            <code>{file.content}</code>
          </pre>
        </details>
      ))}
    </div>
  );
}
