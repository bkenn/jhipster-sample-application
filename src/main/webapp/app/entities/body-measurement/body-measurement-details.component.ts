import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBodyMeasurement } from '@/shared/model/body-measurement.model';
import BodyMeasurementService from './body-measurement.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class BodyMeasurementDetails extends Vue {
  @Inject('bodyMeasurementService') private bodyMeasurementService: () => BodyMeasurementService;
  @Inject('alertService') private alertService: () => AlertService;

  public bodyMeasurement: IBodyMeasurement = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bodyMeasurementId) {
        vm.retrieveBodyMeasurement(to.params.bodyMeasurementId);
      }
    });
  }

  public retrieveBodyMeasurement(bodyMeasurementId) {
    this.bodyMeasurementService()
      .find(bodyMeasurementId)
      .then(res => {
        this.bodyMeasurement = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
