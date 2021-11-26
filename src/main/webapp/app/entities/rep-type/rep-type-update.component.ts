import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ExerciseService from '@/entities/exercise/exercise.service';
import { IExercise } from '@/shared/model/exercise.model';

import { IRepType, RepType } from '@/shared/model/rep-type.model';
import RepTypeService from './rep-type.service';

const validations: any = {
  repType: {
    name: {},
    display: {},
  },
};

@Component({
  validations,
})
export default class RepTypeUpdate extends Vue {
  @Inject('repTypeService') private repTypeService: () => RepTypeService;
  @Inject('alertService') private alertService: () => AlertService;

  public repType: IRepType = new RepType();

  @Inject('exerciseService') private exerciseService: () => ExerciseService;

  public exercises: IExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.repTypeId) {
        vm.retrieveRepType(to.params.repTypeId);
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
    if (this.repType.id) {
      this.repTypeService()
        .update(this.repType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.repType.updated', { param: param.id });
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
      this.repTypeService()
        .create(this.repType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.repType.created', { param: param.id });
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

  public retrieveRepType(repTypeId): void {
    this.repTypeService()
      .find(repTypeId)
      .then(res => {
        this.repType = res;
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
