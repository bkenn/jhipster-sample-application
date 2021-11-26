import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';

export interface IWorkoutRoutineExerciseSet {
  id?: number;
  reps?: number | null;
  weight?: number | null;
  time?: string | null;
  workoutRoutineExercise?: IWorkoutRoutineExercise | null;
}

export class WorkoutRoutineExerciseSet implements IWorkoutRoutineExerciseSet {
  constructor(
    public id?: number,
    public reps?: number | null,
    public weight?: number | null,
    public time?: string | null,
    public workoutRoutineExercise?: IWorkoutRoutineExercise | null
  ) {}
}
