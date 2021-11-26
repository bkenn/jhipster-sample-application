import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ExerciseService from '@/entities/exercise/exercise.service';
import { IExercise } from '@/shared/model/exercise.model';

import { IMuscle, Muscle } from '@/shared/model/muscle.model';
import MuscleService from './muscle.service';

const validations: any = {
  muscle: {
    name: {},
    description: {},
    muscleOrder: {},
    imageUrlMain: {},
    imageUrlSecondary: {},
    front: {},
  },
};

@Component({
  validations,
})
export default class MuscleUpdate extends Vue {
  @Inject('muscleService') private muscleService: () => MuscleService;
  @Inject('alertService') private alertService: () => AlertService;

  public muscle: IMuscle = new Muscle();

  @Inject('exerciseService') private exerciseService: () => ExerciseService;

  public exercises: IExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.muscleId) {
        vm.retrieveMuscle(to.params.muscleId);
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
    if (this.muscle.id) {
      this.muscleService()
        .update(this.muscle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.muscle.updated', { param: param.id });
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
      this.muscleService()
        .create(this.muscle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.muscle.created', { param: param.id });
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

  public retrieveMuscle(muscleId): void {
    this.muscleService()
      .find(muscleId)
      .then(res => {
        this.muscle = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.exerciseService()
      .retrieve()
      .then(res => {
        this.exercises = res.data;
      });
  }
}
