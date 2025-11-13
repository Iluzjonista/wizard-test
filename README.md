# React + TypeScript Wizard

A minimal multi-step wizard built with **React + TypeScript**.  
The wizard renders one question at a time, skipping hidden or already-answered questions, and provides intelligent navigation forward/backward.

---

## 🚀 Setup

1. **Clone or create project**
   ```bash
   npm create vite@latest my-wizard -- --template react-ts
   cd my-wizard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy source files**
   - Place `application.ts`, `navigation.ts`, `Wizard.tsx`, `App.tsx`, and `main.tsx` into `src/`.

4. **Run dev server**
   ```bash
   npm run dev
   ```

---

## 📖 Features

- Shows one question at a time in the given order (Form → Section → Question).
- Hidden questions (`hide: true`) are never shown or navigated to.
- Navigation forward/back skips answered/hidden questions.
- Input field updates stored values live.
- Sidebar lists all visible questions with answered/unanswered status.
- Skip button to advance without answering.
- Completion state when all visible questions are answered.

---

## 🧩 Data

Questions and answers are defined in `application.ts`.  
Unanswered values are considered:
- `''` (empty string)
- `null` / `undefined`
- `[]` (empty array)

---