import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import BodyMeasurementService from '@/entities/body-measurement/body-measurement.service';
import { IBodyMeasurement } from '@/shared/model/body-measurement.model';

import WeightService from '@/entities/weight/weight.service';
import { IWeight } from '@/shared/model/weight.model';

import { IMeasurementType, MeasurementType } from '@/shared/model/measurement-type.model';
import MeasurementTypeService from './measurement-type.service';

const validations: any = {
  measurementType: {
    name: {
      required,
    },
    description: {},
    measurementOrder: {},
    measurementUnit: {},
  },
};

@Component({
  validations,
})
export default class MeasurementTypeUpdate extends Vue {
  @Inject('measurementTypeService') private measurementTypeService: () => MeasurementTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public measurementType: IMeasurementType = new MeasurementType();

  @Inject('bodyMeasurementService') private bodyMeasurementService: () => BodyMeasurementService;

  public bodyMeasurements: IBodyMeasurement[] = [];

  @Inject('weightService') private weightService: () => WeightService;

  public weights: IWeight[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.measurementTypeId) {
        vm.retrieveMeasurementType(to.params.measurementTypeId);
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
    if (this.measurementType.id) {
      this.measurementTypeService()
        .update(this.measurementType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.measurementType.updated', { param: param.id });
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
      this.measurementTypeService()
        .create(this.measurementType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.measurementType.created', { param: param.id });
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

  public retrieveMeasurementType(measurementTypeId): void {
    this.measurementTypeService()
      .find(measurementTypeId)
      .then(res => {
        this.measurementType = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.bodyMeasurementService()
      .retrieve()
      .then(res => {
        this.bodyMeasurements = res.data;
      });
    this.weightService()
      .retrieve()
      .then(res => {
        this.weights = res.data;
      });
  }
}
