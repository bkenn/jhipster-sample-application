import { Component, Vue, Inject } from 'vue-property-decorator';

import { decimal, required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import MeasurementTypeService from '@/entities/measurement-type/measurement-type.service';
import { IMeasurementType } from '@/shared/model/measurement-type.model';

import { IBodyMeasurement, BodyMeasurement } from '@/shared/model/body-measurement.model';
import BodyMeasurementService from './body-measurement.service';

const validations: any = {
  bodyMeasurement: {
    value: {
      required,
      decimal,
    },
    bodyMeasurementDateTime: {},
  },
};

@Component({
  validations,
})
export default class BodyMeasurementUpdate extends Vue {
  @Inject('bodyMeasurementService') private bodyMeasurementService: () => BodyMeasurementService;
  @Inject('alertService') private alertService: () => AlertService;

  public bodyMeasurement: IBodyMeasurement = new BodyMeasurement();

  @Inject('measurementTypeService') private measurementTypeService: () => MeasurementTypeService;

  public measurementTypes: IMeasurementType[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bodyMeasurementId) {
        vm.retrieveBodyMeasurement(to.params.bodyMeasurementId);
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
    if (this.bodyMeasurement.id) {
      this.bodyMeasurementService()
        .update(this.bodyMeasurement)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.bodyMeasurement.updated', { param: param.id });
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
      this.bodyMeasurementService()
        .create(this.bodyMeasurement)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.bodyMeasurement.created', { param: param.id });
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
      this.bodyMeasurement[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.bodyMeasurement[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.bodyMeasurement[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.bodyMeasurement[field] = null;
    }
  }

  public retrieveBodyMeasurement(bodyMeasurementId): void {
    this.bodyMeasurementService()
      .find(bodyMeasurementId)
      .then(res => {
        res.bodyMeasurementDateTime = new Date(res.bodyMeasurementDateTime);
        this.bodyMeasurement = res;
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
