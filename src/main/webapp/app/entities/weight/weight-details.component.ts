import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWeight } from '@/shared/model/weight.model';
import WeightService from './weight.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class WeightDetails extends Vue {
  @Inject('weightService') private weightService: () => WeightService;
  @Inject('alertService') private alertService: () => AlertService;

  public weight: IWeight = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.weightId) {
        vm.retrieveWeight(to.params.weightId);
      }
    });
  }

  public retrieveWeight(weightId) {
    this.weightService()
      .find(weightId)
      .then(res => {
        this.weight = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
