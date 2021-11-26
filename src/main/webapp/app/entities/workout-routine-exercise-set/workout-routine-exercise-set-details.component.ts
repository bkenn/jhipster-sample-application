import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWorkoutRoutineExerciseSet } from '@/shared/model/workout-routine-exercise-set.model';
import WorkoutRoutineExerciseSetService from './workout-routine-exercise-set.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WorkoutRoutineExerciseSetDetails extends Vue {
  @Inject('workoutRoutineExerciseSetService') private workoutRoutineExerciseSetService: () => WorkoutRoutineExerciseSetService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutineExerciseSet: IWorkoutRoutineExerciseSet = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineExerciseSetId) {
        vm.retrieveWorkoutRoutineExerciseSet(to.params.workoutRoutineExerciseSetId);
      }
    });
  }

  public retrieveWorkoutRoutineExerciseSet(workoutRoutineExerciseSetId) {
    this.workoutRoutineExerciseSetService()
      .find(workoutRoutineExerciseSetId)
      .then(res => {
        this.workoutRoutineExerciseSet = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
