import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';

export interface IWorkoutRoutineGroup {
  id?: number;
  name?: string | null;
  workoutRoutines?: IWorkoutRoutine[] | null;
}

export class WorkoutRoutineGroup implements IWorkoutRoutineGroup {
  constructor(public id?: number, public name?: string | null, public workoutRoutines?: IWorkoutRoutine[] | null) {}
}
