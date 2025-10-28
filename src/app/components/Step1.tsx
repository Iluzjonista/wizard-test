import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
export interface Step1Props {
    onNext: (data: string) => void;
  }
const Step1 = ({ onNext }: Step1Props) => {
    const { handleSubmit } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data: any) => {
        onNext(data);
    };

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name</label>
                <div></div>
            </div>
            <button type="submit">Next</button>
        </form>
  );
};
export default Step1;
