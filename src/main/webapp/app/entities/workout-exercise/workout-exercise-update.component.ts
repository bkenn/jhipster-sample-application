import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import WorkoutExerciseSetService from '@/entities/workout-exercise-set/workout-exercise-set.service';
import { IWorkoutExerciseSet } from '@/shared/model/workout-exercise-set.model';

import ExerciseService from '@/entities/exercise/exercise.service';
import { IExercise } from '@/shared/model/exercise.model';

import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';
import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';

import WorkoutService from '@/entities/workout/workout.service';
import { IWorkout } from '@/shared/model/workout.model';

import { IWorkoutExercise, WorkoutExercise } from '@/shared/model/workout-exercise.model';
import WorkoutExerciseService from './workout-exercise.service';

const validations: any = {
  workoutExercise: {
    note: {},
    timer: {},
  },
};

@Component({
  validations,
})
export default class WorkoutExerciseUpdate extends Vue {
  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutExercise: IWorkoutExercise = new WorkoutExercise();

  @Inject('workoutExerciseSetService') private workoutExerciseSetService: () => WorkoutExerciseSetService;

  public workoutExerciseSets: IWorkoutExerciseSet[] = [];

  @Inject('exerciseService') private exerciseService: () => ExerciseService;

  public exercises: IExercise[] = [];

  @Inject('workoutRoutineExerciseService') private workoutRoutineExerciseService: () => WorkoutRoutineExerciseService;

  public workoutRoutineExercises: IWorkoutRoutineExercise[] = [];

  @Inject('workoutService') private workoutService: () => WorkoutService;

  public workouts: IWorkout[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutExerciseId) {
        vm.retrieveWorkoutExercise(to.params.workoutExerciseId);
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
    if (this.workoutExercise.id) {
      this.workoutExerciseService()
        .update(this.workoutExercise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutExercise.updated', { param: param.id });
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
      this.workoutExerciseService()
        .create(this.workoutExercise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutExercise.created', { param: param.id });
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

  public retrieveWorkoutExercise(workoutExerciseId): void {
    this.workoutExerciseService()
      .find(workoutExerciseId)
      .then(res => {
        this.workoutExercise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.workoutExerciseSetService()
      .retrieve()
      .then(res => {
        this.workoutExerciseSets = res.data;
      });
    this.exerciseService()
      .retrieve()
      .then(res => {
        this.exercises = res.data;
      });
    this.workoutRoutineExerciseService()
      .retrieve()
      .then(res => {
        this.workoutRoutineExercises = res.data;
      });
    this.workoutService()
      .retrieve()
      .then(res => {
        this.workouts = res.data;
      });
  }
}
