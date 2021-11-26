import { IExercise } from '@/shared/model/exercise.model';

export interface IRepType {
  id?: number;
  name?: string | null;
  display?: string | null;
  exercises?: IExercise[] | null;
}

export class RepType implements IRepType {
  constructor(public id?: number, public name?: string | null, public display?: string | null, public exercises?: IExercise[] | null) {}
}
