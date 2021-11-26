import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';
import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';
import { IUser } from '@/shared/model/user.model';

export interface IWorkout {
  id?: number;
  title?: string | null;
  description?: string | null;
  workoutStartDateTime?: Date | null;
  workoutEndDateTime?: Date | null;
  workoutExercises?: IWorkoutExercise[] | null;
  workoutRoutine?: IWorkoutRoutine | null;
  user?: IUser | null;
}

export class Workout implements IWorkout {
  constructor(
    public id?: number,
    public title?: string | null,
    public description?: string | null,
    public workoutStartDateTime?: Date | null,
    public workoutEndDateTime?: Date | null,
    public workoutExercises?: IWorkoutExercise[] | null,
    public workoutRoutine?: IWorkoutRoutine | null,
    public user?: IUser | null
  ) {}
}
