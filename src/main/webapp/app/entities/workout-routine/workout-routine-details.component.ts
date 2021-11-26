import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';
import WorkoutRoutineService from './workout-routine.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutRoutineDetails extends Vue {
  @Inject('workoutRoutineService') private workoutRoutineService: () => WorkoutRoutineService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutine: IWorkoutRoutine = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineId) {
        vm.retrieveWorkoutRoutine(to.params.workoutRoutineId);
      }
    });
  }

  public retrieveWorkoutRoutine(workoutRoutineId) {
    this.workoutRoutineService()
      .find(workoutRoutineId)
      .then(res => {
        this.workoutRoutine = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
