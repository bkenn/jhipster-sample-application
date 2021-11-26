import { IExercise } from '@/shared/model/exercise.model';

export interface IExerciseCategory {
  id?: number;
  name?: string;
  categoryOrder?: number | null;
  exercises?: IExercise[] | null;
}

export class ExerciseCategory implements IExerciseCategory {
  constructor(public id?: number, public name?: string, public categoryOrder?: number | null, public exercises?: IExercise[] | null) {}
}
