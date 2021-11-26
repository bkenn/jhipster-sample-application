import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';

import WorkoutRoutineExerciseService from './workout-routine-exercise.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class WorkoutRoutineExercise extends Vue {
  @Inject('workoutRoutineExerciseService') private workoutRoutineExerciseService: () => WorkoutRoutineExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public workoutRoutineExercises: IWorkoutRoutineExercise[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWorkoutRoutineExercises();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllWorkoutRoutineExercises();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllWorkoutRoutineExercises();
  }

  public retrieveAllWorkoutRoutineExercises(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.workoutRoutineExerciseService()
        .search(this.currentSearch)
        .then(
          res => {
            this.workoutRoutineExercises = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.workoutRoutineExerciseService()
      .retrieve()
      .then(
        res => {
          this.workoutRoutineExercises = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IWorkoutRoutineExercise): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWorkoutRoutineExercise(): void {
    this.workoutRoutineExerciseService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineExercise.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllWorkoutRoutineExercises();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
