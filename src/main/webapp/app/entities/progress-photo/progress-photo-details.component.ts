import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IProgressPhoto } from '@/shared/model/progress-photo.model';
import ProgressPhotoService from './progress-photo.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ProgressPhotoDetails extends mixins(JhiDataUtils) {
  @Inject('progressPhotoService') private progressPhotoService: () => ProgressPhotoService;
  @Inject('alertService') private alertService: () => AlertService;

  public progressPhoto: IProgressPhoto = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.progressPhotoId) {
        vm.retrieveProgressPhoto(to.params.progressPhotoId);
      }
    });
  }

  public retrieveProgressPhoto(progressPhotoId) {
    this.progressPhotoService()
      .find(progressPhotoId)
      .then(res => {
        this.progressPhoto = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
