'use client'
import type { Application, QuestionRef } from './data/application';

export function flattenVisibleQuestions(app: Application): QuestionRef[] {
  return app.forms.flatMap(form =>
    form.sections.flatMap(section =>
      section.questions
        .filter(q => !q.hide)
        .map(q => ({
          id: q.id,
          hide: false,
          path: { formId: form.id, sectionId: section.id },
        }))
    )
  );
}

export function isUnanswered(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export const isAnswered = (value: unknown): boolean => !isUnanswered(value);

export function nextUnansweredIndex(
  questions: QuestionRef[],
  values: Record<string, unknown>,
  fromIndex: number
): number | null {
  const idx = questions.findIndex(
    (q, i) => i > fromIndex && isUnanswered(values[q.id])
  );
  return idx === -1 ? null : idx;
}

export function prevUnansweredIndex(
  questions: QuestionRef[],
  values: Record<string, unknown>,
  fromIndex: number
): number | null {
  const idx = questions
    .slice(0, fromIndex)
    .findLastIndex(q => isUnanswered(values[q.id]));
  return idx === -1 ? null : idx;
}

export function firstUnansweredIndex(
  questions: QuestionRef[],
  values: Record<string, unknown>
): number | null {
  const idx = questions.findIndex(q => isUnanswered(values[q.id]));
  return idx === -1 ? null : idx;
}

export function isComplete(
  questions: QuestionRef[],
  values: Record<string, unknown>
): boolean {
  return questions.every(q => isAnswered(values[q.id]));
}
