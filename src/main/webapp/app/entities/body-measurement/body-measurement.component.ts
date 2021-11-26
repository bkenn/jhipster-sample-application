import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBodyMeasurement } from '@/shared/model/body-measurement.model';

import BodyMeasurementService from './body-measurement.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BodyMeasurement extends Vue {
  @Inject('bodyMeasurementService') private bodyMeasurementService: () => BodyMeasurementService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public bodyMeasurements: IBodyMeasurement[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBodyMeasurements();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllBodyMeasurements();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllBodyMeasurements();
  }

  public retrieveAllBodyMeasurements(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.bodyMeasurementService()
        .search(this.currentSearch)
        .then(
          res => {
            this.bodyMeasurements = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.bodyMeasurementService()
      .retrieve()
      .then(
        res => {
          this.bodyMeasurements = res.data;
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

  public prepareRemove(instance: IBodyMeasurement): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBodyMeasurement(): void {
    this.bodyMeasurementService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.bodyMeasurement.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllBodyMeasurements();
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
