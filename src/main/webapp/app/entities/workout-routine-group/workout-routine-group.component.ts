import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWorkoutRoutineGroup } from '@/shared/model/workout-routine-group.model';

import WorkoutRoutineGroupService from './workout-routine-group.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class WorkoutRoutineGroup extends Vue {
  @Inject('workoutRoutineGroupService') private workoutRoutineGroupService: () => WorkoutRoutineGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public workoutRoutineGroups: IWorkoutRoutineGroup[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWorkoutRoutineGroups();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllWorkoutRoutineGroups();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllWorkoutRoutineGroups();
  }

  public retrieveAllWorkoutRoutineGroups(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.workoutRoutineGroupService()
        .search(this.currentSearch)
        .then(
          res => {
            this.workoutRoutineGroups = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.workoutRoutineGroupService()
      .retrieve()
      .then(
        res => {
          this.workoutRoutineGroups = res.data;
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

  public prepareRemove(instance: IWorkoutRoutineGroup): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWorkoutRoutineGroup(): void {
    this.workoutRoutineGroupService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineGroup.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllWorkoutRoutineGroups();
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
