import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMeasurementType } from '@/shared/model/measurement-type.model';

import MeasurementTypeService from './measurement-type.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class MeasurementType extends Vue {
  @Inject('measurementTypeService') private measurementTypeService: () => MeasurementTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public measurementTypes: IMeasurementType[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMeasurementTypes();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllMeasurementTypes();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllMeasurementTypes();
  }

  public retrieveAllMeasurementTypes(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.measurementTypeService()
        .search(this.currentSearch)
        .then(
          res => {
            this.measurementTypes = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.measurementTypeService()
      .retrieve()
      .then(
        res => {
          this.measurementTypes = res.data;
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

  public prepareRemove(instance: IMeasurementType): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMeasurementType(): void {
    this.measurementTypeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.measurementType.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMeasurementTypes();
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
