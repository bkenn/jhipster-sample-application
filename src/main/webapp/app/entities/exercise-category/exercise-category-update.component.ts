import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ExerciseService from '@/entities/exercise/exercise.service';
import { IExercise } from '@/shared/model/exercise.model';

import { IExerciseCategory, ExerciseCategory } from '@/shared/model/exercise-category.model';
import ExerciseCategoryService from './exercise-category.service';

const validations: any = {
  exerciseCategory: {
    name: {
      required,
    },
    categoryOrder: {},
  },
};

@Component({
  validations,
})
export default class ExerciseCategoryUpdate extends Vue {
  @Inject('exerciseCategoryService') private exerciseCategoryService: () => ExerciseCategoryService;
  @Inject('alertService') private alertService: () => AlertService;

  public exerciseCategory: IExerciseCategory = new ExerciseCategory();

  @Inject('exerciseService') private exerciseService: () => ExerciseService;

  public exercises: IExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.exerciseCategoryId) {
        vm.retrieveExerciseCategory(to.params.exerciseCategoryId);
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
    if (this.exerciseCategory.id) {
      this.exerciseCategoryService()
        .update(this.exerciseCategory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.exerciseCategory.updated', { param: param.id });
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
      this.exerciseCategoryService()
        .create(this.exerciseCategory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.exerciseCategory.created', { param: param.id });
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

  public retrieveExerciseCategory(exerciseCategoryId): void {
    this.exerciseCategoryService()
      .find(exerciseCategoryId)
      .then(res => {
        this.exerciseCategory = res;
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
