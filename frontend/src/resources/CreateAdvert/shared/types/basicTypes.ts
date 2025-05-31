export type onFinishStep = ({ type, data }: { type: 'StepOne' | 'StepTwo' | 'StepThree'; data: object }) => void;

export enum CreateAdvertTypes {
    Sale = 0,
    Fracht = 1
}