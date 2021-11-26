import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';
import { IWorkout } from '@/shared/model/workout.model';
import { IWorkoutRoutineGroup } from '@/shared/model/workout-routine-group.model';

export interface IWorkoutRoutine {
  id?: number;
  title?: string | null;
  description?: string | null;
  workoutRoutineExercise?: IWorkoutRoutineExercise | null;
  workouts?: IWorkout[] | null;
  workoutRoutineGroups?: IWorkoutRoutineGroup[] | null;
}

export class WorkoutRoutine implements IWorkoutRoutine {
  constructor(
    public id?: number,
    public title?: string | null,
    public description?: string | null,
    public workoutRoutineExercise?: IWorkoutRoutineExercise | null,
    public workouts?: IWorkout[] | null,
    public workoutRoutineGroups?: IWorkoutRoutineGroup[] | null
  ) {}
}
