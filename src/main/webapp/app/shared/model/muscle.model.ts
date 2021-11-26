import { IExercise } from '@/shared/model/exercise.model';

export interface IMuscle {
  id?: number;
  name?: string | null;
  description?: string | null;
  muscleOrder?: number | null;
  imageUrlMain?: string | null;
  imageUrlSecondary?: string | null;
  front?: boolean | null;
  exercises?: IExercise[] | null;
}

export class Muscle implements IMuscle {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public muscleOrder?: number | null,
    public imageUrlMain?: string | null,
    public imageUrlSecondary?: string | null,
    public front?: boolean | null,
    public exercises?: IExercise[] | null
  ) {
    this.front = this.front ?? false;
  }
}
