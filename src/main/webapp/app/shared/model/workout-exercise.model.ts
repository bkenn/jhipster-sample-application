import { IWorkoutExerciseSet } from '@/shared/model/workout-exercise-set.model';
import { IExercise } from '@/shared/model/exercise.model';
import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';
import { IWorkout } from '@/shared/model/workout.model';

export interface IWorkoutExercise {
  id?: number;
  note?: string | null;
  timer?: string | null;
  workoutExerciseSets?: IWorkoutExerciseSet[] | null;
  exercise?: IExercise | null;
  workoutRoutineExercise?: IWorkoutRoutineExercise | null;
  workout?: IWorkout | null;
}

export class WorkoutExercise implements IWorkoutExercise {
  constructor(
    public id?: number,
    public note?: string | null,
    public timer?: string | null,
    public workoutExerciseSets?: IWorkoutExerciseSet[] | null,
    public exercise?: IExercise | null,
    public workoutRoutineExercise?: IWorkoutRoutineExercise | null,
    public workout?: IWorkout | null
  ) {}
}
