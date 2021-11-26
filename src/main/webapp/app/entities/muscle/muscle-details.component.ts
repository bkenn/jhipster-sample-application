import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMuscle } from '@/shared/model/muscle.model';
import MuscleService from './muscle.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MuscleDetails extends Vue {
  @Inject('muscleService') private muscleService: () => MuscleService;
  @Inject('alertService') private alertService: () => AlertService;

  public muscle: IMuscle = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.muscleId) {
        vm.retrieveMuscle(to.params.muscleId);
      }
    });
  }

  public retrieveMuscle(muscleId) {
    this.muscleService()
      .find(muscleId)
      .then(res => {
        this.muscle = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
