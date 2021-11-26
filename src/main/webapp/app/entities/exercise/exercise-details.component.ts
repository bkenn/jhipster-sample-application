import { Component, Vue, Inject } from 'vue-property-decorator';

import { IExercise } from '@/shared/model/exercise.model';
import ExerciseService from './exercise.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ExerciseDetails extends Vue {
  @Inject('exerciseService') private exerciseService: () => ExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public exercise: IExercise = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.exerciseId) {
        vm.retrieveExercise(to.params.exerciseId);
      }
    });
  }

  public retrieveExercise(exerciseId) {
    this.exerciseService()
      .find(exerciseId)
      .then(res => {
        this.exercise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
