import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWorkoutRoutineExerciseSet } from '@/shared/model/workout-routine-exercise-set.model';

import WorkoutRoutineExerciseSetService from './workout-routine-exercise-set.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class WorkoutRoutineExerciseSet extends Vue {
  @Inject('workoutRoutineExerciseSetService') private workoutRoutineExerciseSetService: () => WorkoutRoutineExerciseSetService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public workoutRoutineExerciseSets: IWorkoutRoutineExerciseSet[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWorkoutRoutineExerciseSets();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllWorkoutRoutineExerciseSets();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllWorkoutRoutineExerciseSets();
  }

  public retrieveAllWorkoutRoutineExerciseSets(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.workoutRoutineExerciseSetService()
        .search(this.currentSearch)
        .then(
          res => {
            this.workoutRoutineExerciseSets = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.workoutRoutineExerciseSetService()
      .retrieve()
      .then(
        res => {
          this.workoutRoutineExerciseSets = res.data;
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

  public prepareRemove(instance: IWorkoutRoutineExerciseSet): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWorkoutRoutineExerciseSet(): void {
    this.workoutRoutineExerciseSetService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllWorkoutRoutineExerciseSets();
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
