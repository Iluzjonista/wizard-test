export interface MainProps {
    values: Values[]
    forms: StepsProps[]
}

export interface StepsProps {
  id: string;
  name: string;
  sections: StepProps[];
}

export interface StepProps {
  id: string;
  name: string;
  questions: StepQuestionProps[];
}

export interface StepQuestionProps {
  id: string;
  hide: boolean;
}

export interface Values {
  id: string|Array<string | number>|null;
}