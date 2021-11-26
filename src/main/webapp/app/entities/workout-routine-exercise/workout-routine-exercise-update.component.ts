import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import WorkoutRoutineExerciseSetService from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.service';
import { IWorkoutRoutineExerciseSet } from '@/shared/model/workout-routine-exercise-set.model';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';

import { IWorkoutRoutineExercise, WorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';
import WorkoutRoutineExerciseService from './workout-routine-exercise.service';

const validations: any = {
  workoutRoutineExercise: {
    note: {},
    timer: {},
  },
};

@Component({
  validations,
})
export default class WorkoutRoutineExerciseUpdate extends Vue {
  @Inject('workoutRoutineExerciseService') private workoutRoutineExerciseService: () => WorkoutRoutineExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutineExercise: IWorkoutRoutineExercise = new WorkoutRoutineExercise();

  @Inject('workoutRoutineExerciseSetService') private workoutRoutineExerciseSetService: () => WorkoutRoutineExerciseSetService;

  public workoutRoutineExerciseSets: IWorkoutRoutineExerciseSet[] = [];

  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;

  public workoutExercises: IWorkoutExercise[] = [];

  @Inject('workoutRoutineService') private workoutRoutineService: () => WorkoutRoutineService;

  public workoutRoutines: IWorkoutRoutine[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineExerciseId) {
        vm.retrieveWorkoutRoutineExercise(to.params.workoutRoutineExerciseId);
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
    if (this.workoutRoutineExercise.id) {
      this.workoutRoutineExerciseService()
        .update(this.workoutRoutineExercise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineExercise.updated', { param: param.id });
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
      this.workoutRoutineExerciseService()
        .create(this.workoutRoutineExercise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineExercise.created', { param: param.id });
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

  public retrieveWorkoutRoutineExercise(workoutRoutineExerciseId): void {
    this.workoutRoutineExerciseService()
      .find(workoutRoutineExerciseId)
      .then(res => {
        this.workoutRoutineExercise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.workoutRoutineExerciseSetService()
      .retrieve()
      .then(res => {
        this.workoutRoutineExerciseSets = res.data;
      });
    this.workoutExerciseService()
      .retrieve()
      .then(res => {
        this.workoutExercises = res.data;
      });
    this.workoutRoutineService()
      .retrieve()
      .then(res => {
        this.workoutRoutines = res.data;
      });
  }
}
