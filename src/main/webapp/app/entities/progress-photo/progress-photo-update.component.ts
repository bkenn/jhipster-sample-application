import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import { IProgressPhoto, ProgressPhoto } from '@/shared/model/progress-photo.model';
import ProgressPhotoService from './progress-photo.service';

const validations: any = {
  progressPhoto: {
    note: {},
    image: {},
    weightDate: {},
  },
};

@Component({
  validations,
})
export default class ProgressPhotoUpdate extends mixins(JhiDataUtils) {
  @Inject('progressPhotoService') private progressPhotoService: () => ProgressPhotoService;
  @Inject('alertService') private alertService: () => AlertService;

  public progressPhoto: IProgressPhoto = new ProgressPhoto();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.progressPhotoId) {
        vm.retrieveProgressPhoto(to.params.progressPhotoId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.progressPhoto.id) {
      this.progressPhotoService()
        .update(this.progressPhoto)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.progressPhoto.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.progressPhotoService()
        .create(this.progressPhoto)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.progressPhoto.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.progressPhoto[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.progressPhoto[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.progressPhoto[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.progressPhoto[field] = null;
    }
  }

  public retrieveProgressPhoto(progressPhotoId): void {
    this.progressPhotoService()
      .find(progressPhotoId)
      .then(res => {
        res.weightDate = new Date(res.weightDate);
        this.progressPhoto = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.progressPhoto && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.progressPhoto, field)) {
        this.progressPhoto[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.progressPhoto, fieldContentType)) {
        this.progressPhoto[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {}
}
