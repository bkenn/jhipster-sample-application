import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

export interface IWorkoutExerciseSet {
  id?: number;
  reps?: number | null;
  weight?: number | null;
  time?: string | null;
  complete?: boolean | null;
  completeTime?: string | null;
  workoutExercise?: IWorkoutExercise | null;
}

export class WorkoutExerciseSet implements IWorkoutExerciseSet {
  constructor(
    public id?: number,
    public reps?: number | null,
    public weight?: number | null,
    public time?: string | null,
    public complete?: boolean | null,
    public completeTime?: string | null,
    public workoutExercise?: IWorkoutExercise | null
  ) {
    this.complete = this.complete ?? false;
  }
}
