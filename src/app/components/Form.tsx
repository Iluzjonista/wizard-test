import React, { useState } from 'react';
import {MainProps} from '../data/interfaces'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MainProps>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = (data: Partial<MainProps>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (data: Partial<MainProps>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setIsSubmitted(true);
  };

  return (
    <section>
      <nav>
        <h3>MultiStep Form Wizard</h3>
      </nav>
      <p>
        Step {step} of 3
      </p>
      {!isSubmitted ? (
        <>
          {step === 1 && <Step1 onNext={handleNextStep} />}
          {step === 2 && <Step2 onNext={handleNextStep} onBack={handlePrevStep} />}
          {step === 3 && <Step3 onSubmit={handleSubmit} onBack={handlePrevStep} />}
        </>
      ) : (
        <div>
          <p>Form submitted</p>
          <div>
            <button onClick={() => { setStep(1); setFormData({}); setIsSubmitted(false); }}>Fill again</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Form;