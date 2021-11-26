import { IRepType } from '@/shared/model/rep-type.model';
import { IExerciseCategory } from '@/shared/model/exercise-category.model';
import { IExerciseImage } from '@/shared/model/exercise-image.model';
import { IMuscle } from '@/shared/model/muscle.model';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

export interface IExercise {
  id?: number;
  name?: string;
  description?: string | null;
  repType?: IRepType | null;
  exerciseCategory?: IExerciseCategory | null;
  exerciseImages?: IExerciseImage[] | null;
  muscles?: IMuscle[] | null;
  workoutExercises?: IWorkoutExercise[] | null;
}

export class Exercise implements IExercise {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public repType?: IRepType | null,
    public exerciseCategory?: IExerciseCategory | null,
    public exerciseImages?: IExerciseImage[] | null,
    public muscles?: IMuscle[] | null,
    public workoutExercises?: IWorkoutExercise[] | null
  ) {}
}
