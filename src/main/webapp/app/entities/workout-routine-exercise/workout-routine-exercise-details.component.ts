import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';
import WorkoutRoutineExerciseService from './workout-routine-exercise.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutRoutineExerciseDetails extends Vue {
  @Inject('workoutRoutineExerciseService') private workoutRoutineExerciseService: () => WorkoutRoutineExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutineExercise: IWorkoutRoutineExercise = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineExerciseId) {
        vm.retrieveWorkoutRoutineExercise(to.params.workoutRoutineExerciseId);
      }
    });
  }

  public retrieveWorkoutRoutineExercise(workoutRoutineExerciseId) {
    this.workoutRoutineExerciseService()
      .find(workoutRoutineExerciseId)
      .then(res => {
        this.workoutRoutineExercise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
