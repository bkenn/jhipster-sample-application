import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkout } from '@/shared/model/workout.model';
import WorkoutService from './workout.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutDetails extends Vue {
  @Inject('workoutService') private workoutService: () => WorkoutService;
  @Inject('alertService') private alertService: () => AlertService;

  public workout: IWorkout = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutId) {
        vm.retrieveWorkout(to.params.workoutId);
      }
    });
  }

  public retrieveWorkout(workoutId) {
    this.workoutService()
      .find(workoutId)
      .then(res => {
        this.workout = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
