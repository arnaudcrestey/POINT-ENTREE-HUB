import type { Answer } from "@/lib/scoring";

type QuestionCardProps = {
  prompt: string;
  detail?: string;
  answers: Answer[];
  onSelect: (answer: Answer) => void;
};

export function QuestionCard({ prompt, detail, answers, onSelect }: QuestionCardProps) {
  return (
    <section className="surface p-6 md:p-8">
      <h2 className="font-serif text-2xl md:text-3xl leading-tight">
        {prompt.replace(/:/g, "\u00A0:")}
      </h2>

      {detail ? <p className="mt-3 text-sm text-black/65">{detail}</p> : null}

      <div className="mt-6 space-y-3">
        {answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            onClick={() => onSelect(answer)}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-left text-sm transition hover:border-black/30 hover:bg-black/[0.02]"
          >
            {answer.label}
          </button>
        ))}
      </div>
    </section>
  );
}
