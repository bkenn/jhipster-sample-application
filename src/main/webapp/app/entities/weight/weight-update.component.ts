import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import MeasurementTypeService from '@/entities/measurement-type/measurement-type.service';
import { IMeasurementType } from '@/shared/model/measurement-type.model';

import { IWeight, Weight } from '@/shared/model/weight.model';
import WeightService from './weight.service';

const validations: any = {
  weight: {
    value: {},
    weightDateTime: {},
  },
};

@Component({
  validations,
})
export default class WeightUpdate extends Vue {
  @Inject('weightService') private weightService: () => WeightService;
  @Inject('alertService') private alertService: () => AlertService;

  public weight: IWeight = new Weight();

  @Inject('measurementTypeService') private measurementTypeService: () => MeasurementTypeService;

  public measurementTypes: IMeasurementType[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.weightId) {
        vm.retrieveWeight(to.params.weightId);
      }
      vm.initRelationships();
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
    if (this.weight.id) {
      this.weightService()
        .update(this.weight)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.weight.updated', { param: param.id });
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
      this.weightService()
        .create(this.weight)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.weight.created', { param: param.id });
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
      this.weight[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.weight[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.weight[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.weight[field] = null;
    }
  }

  public retrieveWeight(weightId): void {
    this.weightService()
      .find(weightId)
      .then(res => {
        res.weightDateTime = new Date(res.weightDateTime);
        this.weight = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.measurementTypeService()
      .retrieve()
      .then(res => {
        this.measurementTypes = res.data;
      });
  }
}
