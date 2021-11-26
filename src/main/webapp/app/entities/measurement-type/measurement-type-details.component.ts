import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMeasurementType } from '@/shared/model/measurement-type.model';
import MeasurementTypeService from './measurement-type.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MeasurementTypeDetails extends Vue {
  @Inject('measurementTypeService') private measurementTypeService: () => MeasurementTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public measurementType: IMeasurementType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.measurementTypeId) {
        vm.retrieveMeasurementType(to.params.measurementTypeId);
      }
    });
  }

  public retrieveMeasurementType(measurementTypeId) {
    this.measurementTypeService()
      .find(measurementTypeId)
      .then(res => {
        this.measurementType = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
