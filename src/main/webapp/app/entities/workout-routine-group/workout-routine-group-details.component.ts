import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkoutRoutineGroup } from '@/shared/model/workout-routine-group.model';
import WorkoutRoutineGroupService from './workout-routine-group.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutRoutineGroupDetails extends Vue {
  @Inject('workoutRoutineGroupService') private workoutRoutineGroupService: () => WorkoutRoutineGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutineGroup: IWorkoutRoutineGroup = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineGroupId) {
        vm.retrieveWorkoutRoutineGroup(to.params.workoutRoutineGroupId);
      }
    });
  }

  public retrieveWorkoutRoutineGroup(workoutRoutineGroupId) {
    this.workoutRoutineGroupService()
      .find(workoutRoutineGroupId)
      .then(res => {
        this.workoutRoutineGroup = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
