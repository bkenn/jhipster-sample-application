import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';
import WorkoutExerciseService from './workout-exercise.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutExerciseDetails extends Vue {
  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutExercise: IWorkoutExercise = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutExerciseId) {
        vm.retrieveWorkoutExercise(to.params.workoutExerciseId);
      }
    });
  }

  public retrieveWorkoutExercise(workoutExerciseId) {
    this.workoutExerciseService()
      .find(workoutExerciseId)
      .then(res => {
        this.workoutExercise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
