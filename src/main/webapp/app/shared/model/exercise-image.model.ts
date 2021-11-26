import { IExercise } from '@/shared/model/exercise.model';

export interface IExerciseImage {
  id?: number;
  uuid?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  main?: boolean | null;
  exercises?: IExercise[] | null;
}

export class ExerciseImage implements IExerciseImage {
  constructor(
    public id?: number,
    public uuid?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public main?: boolean | null,
    public exercises?: IExercise[] | null
  ) {
    this.main = this.main ?? false;
  }
}
