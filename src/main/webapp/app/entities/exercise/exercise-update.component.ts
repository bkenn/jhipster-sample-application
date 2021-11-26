import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import RepTypeService from '@/entities/rep-type/rep-type.service';
import { IRepType } from '@/shared/model/rep-type.model';

import ExerciseCategoryService from '@/entities/exercise-category/exercise-category.service';
import { IExerciseCategory } from '@/shared/model/exercise-category.model';

import ExerciseImageService from '@/entities/exercise-image/exercise-image.service';
import { IExerciseImage } from '@/shared/model/exercise-image.model';

import MuscleService from '@/entities/muscle/muscle.service';
import { IMuscle } from '@/shared/model/muscle.model';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

import { IExercise, Exercise } from '@/shared/model/exercise.model';
import ExerciseService from './exercise.service';

const validations: any = {
  exercise: {
    name: {
      required,
    },
    description: {},
  },
};

@Component({
  validations,
})
export default class ExerciseUpdate extends Vue {
  @Inject('exerciseService') private exerciseService: () => ExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public exercise: IExercise = new Exercise();

  @Inject('repTypeService') private repTypeService: () => RepTypeService;

  public repTypes: IRepType[] = [];

  @Inject('exerciseCategoryService') private exerciseCategoryService: () => ExerciseCategoryService;

  public exerciseCategories: IExerciseCategory[] = [];

  @Inject('exerciseImageService') private exerciseImageService: () => ExerciseImageService;

  public exerciseImages: IExerciseImage[] = [];

  @Inject('muscleService') private muscleService: () => MuscleService;

  public muscles: IMuscle[] = [];

  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;

  public workoutExercises: IWorkoutExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.exerciseId) {
        vm.retrieveExercise(to.params.exerciseId);
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
    this.exercise.exerciseImages = [];
    this.exercise.muscles = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.exercise.id) {
      this.exerciseService()
        .update(this.exercise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.exercise.updated', { param: param.id });
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
      this.exerciseService()
        .create(this.exercise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.exercise.created', { param: param.id });
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

  public retrieveExercise(exerciseId): void {
    this.exerciseService()
      .find(exerciseId)
      .then(res => {
        this.exercise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.repTypeService()
      .retrieve()
      .then(res => {
        this.repTypes = res.data;
      });
    this.exerciseCategoryService()
      .retrieve()
      .then(res => {
        this.exerciseCategories = res.data;
      });
    this.exerciseImageService()
      .retrieve()
      .then(res => {
        this.exerciseImages = res.data;
      });
    this.muscleService()
      .retrieve()
      .then(res => {
        this.muscles = res.data;
      });
    this.workoutExerciseService()
      .retrieve()
      .then(res => {
        this.workoutExercises = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
