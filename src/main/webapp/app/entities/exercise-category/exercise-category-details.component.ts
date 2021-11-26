import { Component, Vue, Inject } from 'vue-property-decorator';

import { IExerciseCategory } from '@/shared/model/exercise-category.model';
import ExerciseCategoryService from './exercise-category.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ExerciseCategoryDetails extends Vue {
  @Inject('exerciseCategoryService') private exerciseCategoryService: () => ExerciseCategoryService;
  @Inject('alertService') private alertService: () => AlertService;

  public exerciseCategory: IExerciseCategory = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.exerciseCategoryId) {
        vm.retrieveExerciseCategory(to.params.exerciseCategoryId);
      }
    });
  }

  public retrieveExerciseCategory(exerciseCategoryId) {
    this.exerciseCategoryService()
      .find(exerciseCategoryId)
      .then(res => {
        this.exerciseCategory = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
