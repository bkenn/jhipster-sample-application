import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkoutExerciseSet } from '@/shared/model/workout-exercise-set.model';
import WorkoutExerciseSetService from './workout-exercise-set.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutExerciseSetDetails extends Vue {
  @Inject('workoutExerciseSetService') private workoutExerciseSetService: () => WorkoutExerciseSetService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutExerciseSet: IWorkoutExerciseSet = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutExerciseSetId) {
        vm.retrieveWorkoutExerciseSet(to.params.workoutExerciseSetId);
      }
    });
  }

  public retrieveWorkoutExerciseSet(workoutExerciseSetId) {
    this.workoutExerciseSetService()
      .find(workoutExerciseSetId)
      .then(res => {
        this.workoutExerciseSet = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
