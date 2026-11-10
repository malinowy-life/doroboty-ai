import { WorkSampleMaterial } from "./work-sample-material";
import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { evidenceApplicationId, evidenceAreas, projectDescription } from "./work-evidence-scenario";
import "@/app/work-evidence.css";

export function WorkEvidenceSection({
  applicationId,
  answer,
  jobTitle,
}: {
  applicationId: string;
  answer: string;
  jobTitle: string;
}) {
  const [view, setView] = useState<"material" | "review">("material");
  const hasEvidence = applicationId === evidenceApplicationId;
  return (
    <Dialog>
      <section className="work-evidence" aria-labelledby="work-evidence-title">
        <header>
          <h3 id="work-evidence-title">Próbka pracy</h3>
        </header>
        <div className="work-evidence-file">
          <FileText size={22} aria-hidden="true" />
          <div>
            <strong>{hasEvidence ? "Asystent AI do dokumentacji" : "Opis projektu"}</strong>
            <span>
              {hasEvidence
                ? "Wyszukiwanie · odpowiedzi ze źródłami · testy"
                : "Z odpowiedzi kandydata"}
            </span>
          </div>
          <DialogTrigger
            onClick={() => setView("material")}
            render={<Button variant="ghost" size="sm" />}
          >
            Zobacz materiał <ArrowRight size={16} aria-hidden="true" />
          </DialogTrigger>
        </div>
        {hasEvidence ? (
          <>
            <div className="work-evidence-verdict">
              <h4>
                Dopasowanie próbki do roli{" "}
                <span className="work-evidence-status partial">częściowo potwierdzone</span>
              </h4>
              <p>
                Próbka pokazuje integrację AI z dokumentami i podstawowe testy. Nie pokazuje, jak
                kandydat utrzymywał produkt po wdrożeniu — a tego wymaga ta rola.
              </p>
            </div>
            <DialogTrigger
              onClick={() => setView("review")}
              render={<Button className="work-evidence-action" />}
            >
              Zobacz uzasadnienie <ArrowRight size={17} aria-hidden="true" />
            </DialogTrigger>
            <div className="work-evidence-followup">
              <h4>O co warto dopytać</h4>
              <ul>
                <li>Które elementy wyszukiwania i odpowiedzi AI zrobiłeś sam?</li>
                <li>Jak sprawdzałeś poprawność odpowiedzi prawdziwego modelu?</li>
                <li>
                  Czy asystent działał u użytkowników? Jakie problemy rozwiązywałeś po wdrożeniu?
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p className="work-evidence-caption">
            Opis kandydata jest dostępny w projekcie. To zgłoszenie nie zawiera jeszcze oceny próbki
            pracy.
          </p>
        )}
      </section>
      <DialogContent className="work-evidence-dialog">
        <DialogTitle>
          {view === "material" ? "Materiały kandydata" : "Podstawy oceny próbki"}
        </DialogTitle>
        <DialogDescription>
          {view === "material"
            ? hasEvidence
              ? "Asystent AI do dokumentacji · Kuba Wójcik"
              : "Treść przesłana przez kandydata."
            : `Odniesienie do wymagań: ${jobTitle} · Northstar Health`}
        </DialogDescription>
        <div className="work-evidence-dialog-body">
          {view === "material" ? (
            hasEvidence ? (
              <WorkSampleMaterial />
            ) : (
              <p className="work-evidence-answer">{answer}</p>
            )
          ) : (
            <>
              <section className="work-evidence-detail">
                <h3>Własny wkład</h3>
                <p>
                  Kandydat deklaruje, że przygotował wyszukiwanie, odpowiedzi AI i testy. Interfejs
                  i logowanie przypisuje zespołowi. Materiał pokazuje kod, ale bez historii zmian
                  nie potwierdza, kto napisał poszczególne elementy.
                </p>
                <details className="work-evidence-source">
                  <summary>Zobacz podstawę: deklarowany udział</summary>
                  <p>{projectDescription}</p>
                </details>
              </section>
              {evidenceAreas.map((area) => (
                <section className="work-evidence-detail" key={area.title}>
                  <div className="work-evidence-detail-heading">
                    <h3>{area.title}</h3>
                    <span className={`work-evidence-status ${area.tone}`}>{area.status}</span>
                  </div>
                  <p>
                    <strong>{area.heading}</strong>
                  </p>
                  <p>{area.detail}</p>
                  <details className="work-evidence-source">
                    <summary>Zobacz podstawę: {area.source.toLowerCase()}</summary>
                    <p>{area.excerpt}</p>
                  </details>
                </section>
              ))}
            </>
          )}
        </div>
        <DialogClose render={<Button variant="outline" className="work-evidence-return" />}>
          Wróć do zgłoszenia
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
