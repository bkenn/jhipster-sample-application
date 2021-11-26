import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';

import WorkoutRoutineService from './workout-routine.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class WorkoutRoutine extends Vue {
  @Inject('workoutRoutineService') private workoutRoutineService: () => WorkoutRoutineService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public workoutRoutines: IWorkoutRoutine[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWorkoutRoutines();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllWorkoutRoutines();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllWorkoutRoutines();
  }

  public retrieveAllWorkoutRoutines(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.workoutRoutineService()
        .search(this.currentSearch)
        .then(
          res => {
            this.workoutRoutines = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.workoutRoutineService()
      .retrieve()
      .then(
        res => {
          this.workoutRoutines = res.data;
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

  public prepareRemove(instance: IWorkoutRoutine): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWorkoutRoutine(): void {
    this.workoutRoutineService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.workoutRoutine.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllWorkoutRoutines();
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
