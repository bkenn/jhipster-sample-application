import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

import WorkoutExerciseService from './workout-exercise.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class WorkoutExercise extends Vue {
  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public workoutExercises: IWorkoutExercise[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWorkoutExercises();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllWorkoutExercises();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllWorkoutExercises();
  }

  public retrieveAllWorkoutExercises(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.workoutExerciseService()
        .search(this.currentSearch)
        .then(
          res => {
            this.workoutExercises = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.workoutExerciseService()
      .retrieve()
      .then(
        res => {
          this.workoutExercises = res.data;
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

  public prepareRemove(instance: IWorkoutExercise): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWorkoutExercise(): void {
    this.workoutExerciseService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.workoutExercise.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllWorkoutExercises();
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
