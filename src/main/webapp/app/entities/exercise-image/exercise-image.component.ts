import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IExerciseImage } from '@/shared/model/exercise-image.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ExerciseImageService from './exercise-image.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ExerciseImage extends mixins(JhiDataUtils) {
  @Inject('exerciseImageService') private exerciseImageService: () => ExerciseImageService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public exerciseImages: IExerciseImage[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllExerciseImages();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllExerciseImages();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllExerciseImages();
  }

  public retrieveAllExerciseImages(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.exerciseImageService()
        .search(this.currentSearch)
        .then(
          res => {
            this.exerciseImages = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.exerciseImageService()
      .retrieve()
      .then(
        res => {
          this.exerciseImages = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IExerciseImage): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeExerciseImage(): void {
    this.exerciseImageService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.exerciseImage.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllExerciseImages();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
