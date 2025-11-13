'use client'
import { useEffect, useMemo, useState } from 'react';
import { application } from './data/application';
import {
  flattenVisibleQuestions,
  firstUnansweredIndex,
  nextUnansweredIndex,
  prevUnansweredIndex,
  isUnanswered,
  isComplete,
} from './navigation';

type Values = Record<string, unknown>;

export function Wizard() {
  const questions = useMemo(() => flattenVisibleQuestions(application), []);
  const [values, setValues] = useState<Values>({ ...application.values });
  const [index, setIndex] = useState<number | null>(() => firstUnansweredIndex(questions, values));

  useEffect(() => {
    if (index === null) return;
    const currentQ = questions[index];
    if (!currentQ) return;
    const currentVal = values[currentQ.id];
    if (!isUnanswered(currentVal)) {
      const nextIdx = nextUnansweredIndex(questions, values, index);
      if (nextIdx !== index) {
        setTimeout(() => setIndex(nextIdx), 0);
      }
    }
  }, [values, index, questions]);

  const complete = isComplete(questions, values);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (index === null) return;
    const qId = questions[index].id;
    const raw = e.target.value;
    if (raw.length > 1000) {
      alert('Input too long (max 1000 characters)');
      return;
    }
    setValues(prev => ({ ...prev, [qId]: raw }));
  }

  function handleNext() {
    if (index === null) return;
    const nextIdx = nextUnansweredIndex(questions, values, index);
    setIndex(nextIdx);
  }

  function handlePrev() {
    if (index === null) return;
    const prevIdx = prevUnansweredIndex(questions, values, index);
    setIndex(prevIdx);
  }

  function handleSkip() {
    handleNext();
  }

  useEffect(() => {
    if (index === null && !complete) {
      const firstIdx = firstUnansweredIndex(questions, values);
      if (firstIdx !== null && firstIdx !== index) {
        setTimeout(() => setIndex(firstIdx), 0);
      }
    }
  }, [index, complete, questions, values]);

  if (complete) {
    return (
      <div style={{ padding: 24 }}>
        <h2>All done</h2>
        <p>All visible questions are answered.</p>
        <Sidebar questions={questions} values={values} currentIndex={index} onJump={setIndex} />
      </div>
    );
  }

  if (index === null) {
    return (
      <div style={{ padding: 24 }}>
        <h2>No eligible questions</h2>
        <p>Either all questions are hidden or already answered.</p>
      </div>
    );
  }
  
  // Decide whether to use input or textarea based on current value length
  const q = index !== null ? questions[index] : null;
  const currentValue = q ? (values[q.id] as string) ?? '' : '';

  return (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      <div style={{ flex: 1 }}>
        {q && (
          <>
            <h2>Question {index! + 1} of {questions.length}</h2>
            <p><strong>ID:</strong> {q.id}</p>

            <label style={{ display: 'block', marginTop: 12 }}>
              <span style={{ display: 'block', marginBottom: 8 }}>Answer:</span>
              {currentValue.length > 80 ? (
                <textarea
                  value={currentValue}
                  onChange={handleInputChange}
                  rows={4}
                  style={{ padding: 8, width: '100%' }}
                  placeholder="Type your longer answer..."
                />
              ) : (
                <input
                  value={currentValue}
                  onChange={handleInputChange}
                  style={{ padding: 8, width: '100%' }}
                  placeholder="Type your answer..."
                />
              )}
            </label>
          </>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button onClick={handlePrev} disabled={prevUnansweredIndex(questions, values, index) === null}>
            Previous
          </button>
          <button onClick={handleNext} disabled={nextUnansweredIndex(questions, values, index) === null}>
            Next
          </button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      </div>

      <Sidebar questions={questions} values={values} currentIndex={index} onJump={setIndex} />
    </div>
  );
}

function Sidebar(props: {
  questions: ReturnType<typeof flattenVisibleQuestions>;
  values: Values;
  currentIndex: number | null;
  onJump: (idx: number | null) => void;
}) {
  const { questions, values, currentIndex, onJump } = props;
  return (
    <aside style={{ width: 280, borderLeft: '1px solid #ddd', paddingLeft: 16 }}>
      <h3>Questions</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {questions.map((q, i) => {
          const unanswered = isUnanswered(values[q.id]);
          const isCurrent = i === currentIndex;
          return (
            <li
              key={q.id}
              style={{
                padding: '6px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: isCurrent ? 1 : 0.85,
              }}
            >
              <button
                onClick={() => onJump(i)}
                style={{
                  background: isCurrent ? '#eef' : 'transparent',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: '4px 8px',
                  cursor: 'pointer',
                }}
              >
                {i + 1}. {q.id.slice(0, 6)}...
              </button>
              <span
                style={{
                  fontSize: 12,
                  color: unanswered ? '#c00' : '#090',
                  marginLeft: 8,
                }}
              >
                {unanswered ? 'unanswered' : 'answered'}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
