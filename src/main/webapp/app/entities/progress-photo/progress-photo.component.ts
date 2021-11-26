import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProgressPhoto } from '@/shared/model/progress-photo.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ProgressPhotoService from './progress-photo.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ProgressPhoto extends mixins(JhiDataUtils) {
  @Inject('progressPhotoService') private progressPhotoService: () => ProgressPhotoService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public progressPhotos: IProgressPhoto[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProgressPhotos();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllProgressPhotos();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllProgressPhotos();
  }

  public retrieveAllProgressPhotos(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.progressPhotoService()
        .search(this.currentSearch)
        .then(
          res => {
            this.progressPhotos = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.progressPhotoService()
      .retrieve()
      .then(
        res => {
          this.progressPhotos = res.data;
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

  public prepareRemove(instance: IProgressPhoto): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProgressPhoto(): void {
    this.progressPhotoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.progressPhoto.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllProgressPhotos();
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
