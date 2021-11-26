import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

import { IWorkoutExerciseSet, WorkoutExerciseSet } from '@/shared/model/workout-exercise-set.model';
import WorkoutExerciseSetService from './workout-exercise-set.service';

const validations: any = {
  workoutExerciseSet: {
    reps: {},
    weight: {},
    time: {},
    complete: {},
    completeTime: {},
  },
};

@Component({
  validations,
})
export default class WorkoutExerciseSetUpdate extends Vue {
  @Inject('workoutExerciseSetService') private workoutExerciseSetService: () => WorkoutExerciseSetService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutExerciseSet: IWorkoutExerciseSet = new WorkoutExerciseSet();

  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;

  public workoutExercises: IWorkoutExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutExerciseSetId) {
        vm.retrieveWorkoutExerciseSet(to.params.workoutExerciseSetId);
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
    if (this.workoutExerciseSet.id) {
      this.workoutExerciseSetService()
        .update(this.workoutExerciseSet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutExerciseSet.updated', { param: param.id });
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
      this.workoutExerciseSetService()
        .create(this.workoutExerciseSet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutExerciseSet.created', { param: param.id });
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

  public retrieveWorkoutExerciseSet(workoutExerciseSetId): void {
    this.workoutExerciseSetService()
      .find(workoutExerciseSetId)
      .then(res => {
        this.workoutExerciseSet = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.workoutExerciseService()
      .retrieve()
      .then(res => {
        this.workoutExercises = res.data;
      });
  }
}
