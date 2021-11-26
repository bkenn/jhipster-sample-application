import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';

import { IWorkoutRoutineGroup, WorkoutRoutineGroup } from '@/shared/model/workout-routine-group.model';
import WorkoutRoutineGroupService from './workout-routine-group.service';

const validations: any = {
  workoutRoutineGroup: {
    name: {},
  },
};

@Component({
  validations,
})
export default class WorkoutRoutineGroupUpdate extends Vue {
  @Inject('workoutRoutineGroupService') private workoutRoutineGroupService: () => WorkoutRoutineGroupService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutineGroup: IWorkoutRoutineGroup = new WorkoutRoutineGroup();

  @Inject('workoutRoutineService') private workoutRoutineService: () => WorkoutRoutineService;

  public workoutRoutines: IWorkoutRoutine[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineGroupId) {
        vm.retrieveWorkoutRoutineGroup(to.params.workoutRoutineGroupId);
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
    this.workoutRoutineGroup.workoutRoutines = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.workoutRoutineGroup.id) {
      this.workoutRoutineGroupService()
        .update(this.workoutRoutineGroup)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineGroup.updated', { param: param.id });
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
      this.workoutRoutineGroupService()
        .create(this.workoutRoutineGroup)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutineGroup.created', { param: param.id });
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

  public retrieveWorkoutRoutineGroup(workoutRoutineGroupId): void {
    this.workoutRoutineGroupService()
      .find(workoutRoutineGroupId)
      .then(res => {
        this.workoutRoutineGroup = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.workoutRoutineService()
      .retrieve()
      .then(res => {
        this.workoutRoutines = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
