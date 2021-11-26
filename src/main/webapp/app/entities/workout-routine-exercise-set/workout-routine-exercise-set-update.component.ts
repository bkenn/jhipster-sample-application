import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';
import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';

import { IWorkoutRoutineExerciseSet, WorkoutRoutineExerciseSet } from '@/shared/model/workout-routine-exercise-set.model';
import WorkoutRoutineExerciseSetService from './workout-routine-exercise-set.service';

const validations: any = {
  workoutRoutineExerciseSet: {
    reps: {},
    weight: {},
    time: {},
  },
};

@Component({
  validations,
})
export default class WorkoutRoutineExerciseSetUpdate extends Vue {
  @Inject('workoutRoutineExerciseSetService') private workoutRoutineExerciseSetService: () => WorkoutRoutineExerciseSetService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutineExerciseSet: IWorkoutRoutineExerciseSet = new WorkoutRoutineExerciseSet();

  @Inject('workoutRoutineExerciseService') private workoutRoutineExerciseService: () => WorkoutRoutineExerciseService;

  public workoutRoutineExercises: IWorkoutRoutineExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineExerciseSetId) {
        vm.retrieveWorkoutRoutineExerciseSet(to.params.workoutRoutineExerciseSetId);
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
    if (this.workoutRoutineExerciseSet.id) {
      this.workoutRoutineExerciseSetService()
        .update(this.workoutRoutineExerciseSet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.updated', { param: param.id });
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
      this.workoutRoutineExerciseSetService()
        .create(this.workoutRoutineExerciseSet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.created', { param: param.id });
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

  public retrieveWorkoutRoutineExerciseSet(workoutRoutineExerciseSetId): void {
    this.workoutRoutineExerciseSetService()
      .find(workoutRoutineExerciseSetId)
      .then(res => {
        this.workoutRoutineExerciseSet = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.workoutRoutineExerciseService()
      .retrieve()
      .then(res => {
        this.workoutRoutineExercises = res.data;
      });
  }
}
