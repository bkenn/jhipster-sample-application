import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRepType } from '@/shared/model/rep-type.model';
import RepTypeService from './rep-type.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class RepTypeDetails extends Vue {
  @Inject('repTypeService') private repTypeService: () => RepTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public repType: IRepType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.repTypeId) {
        vm.retrieveRepType(to.params.repTypeId);
      }
    });
  }

  public retrieveRepType(repTypeId) {
    this.repTypeService()
      .find(repTypeId)
      .then(res => {
        this.repType = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
