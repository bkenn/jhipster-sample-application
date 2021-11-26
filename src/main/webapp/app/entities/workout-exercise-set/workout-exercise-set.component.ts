import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWorkoutExerciseSet } from '@/shared/model/workout-exercise-set.model';

import WorkoutExerciseSetService from './workout-exercise-set.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class WorkoutExerciseSet extends Vue {
  @Inject('workoutExerciseSetService') private workoutExerciseSetService: () => WorkoutExerciseSetService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public workoutExerciseSets: IWorkoutExerciseSet[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWorkoutExerciseSets();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllWorkoutExerciseSets();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllWorkoutExerciseSets();
  }

  public retrieveAllWorkoutExerciseSets(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.workoutExerciseSetService()
        .search(this.currentSearch)
        .then(
          res => {
            this.workoutExerciseSets = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.workoutExerciseSetService()
      .retrieve()
      .then(
        res => {
          this.workoutExerciseSets = res.data;
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

  public prepareRemove(instance: IWorkoutExerciseSet): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWorkoutExerciseSet(): void {
    this.workoutExerciseSetService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.workoutExerciseSet.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllWorkoutExerciseSets();
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
