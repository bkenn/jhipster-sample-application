import { IWorkoutRoutineExerciseSet } from '@/shared/model/workout-routine-exercise-set.model';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';
import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';

export interface IWorkoutRoutineExercise {
  id?: number;
  note?: string | null;
  timer?: string | null;
  workoutRoutineExerciseSets?: IWorkoutRoutineExerciseSet[] | null;
  workoutExercises?: IWorkoutExercise[] | null;
  workoutRoutines?: IWorkoutRoutine[] | null;
}

export class WorkoutRoutineExercise implements IWorkoutRoutineExercise {
  constructor(
    public id?: number,
    public note?: string | null,
    public timer?: string | null,
    public workoutRoutineExerciseSets?: IWorkoutRoutineExerciseSet[] | null,
    public workoutExercises?: IWorkoutExercise[] | null,
    public workoutRoutines?: IWorkoutRoutine[] | null
  ) {}
}
