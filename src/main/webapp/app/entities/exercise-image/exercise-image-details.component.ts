import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IExerciseImage } from '@/shared/model/exercise-image.model';
import ExerciseImageService from './exercise-image.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ExerciseImageDetails extends mixins(JhiDataUtils) {
  @Inject('exerciseImageService') private exerciseImageService: () => ExerciseImageService;
  @Inject('alertService') private alertService: () => AlertService;

  public exerciseImage: IExerciseImage = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.exerciseImageId) {
        vm.retrieveExerciseImage(to.params.exerciseImageId);
      }
    });
  }

  public retrieveExerciseImage(exerciseImageId) {
    this.exerciseImageService()
      .find(exerciseImageId)
      .then(res => {
        this.exerciseImage = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
