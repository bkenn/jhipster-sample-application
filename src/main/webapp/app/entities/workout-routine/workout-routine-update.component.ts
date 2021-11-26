import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';
import { IWorkoutRoutineExercise } from '@/shared/model/workout-routine-exercise.model';

import WorkoutService from '@/entities/workout/workout.service';
import { IWorkout } from '@/shared/model/workout.model';

import WorkoutRoutineGroupService from '@/entities/workout-routine-group/workout-routine-group.service';
import { IWorkoutRoutineGroup } from '@/shared/model/workout-routine-group.model';

import { IWorkoutRoutine, WorkoutRoutine } from '@/shared/model/workout-routine.model';
import WorkoutRoutineService from './workout-routine.service';

const validations: any = {
  workoutRoutine: {
    title: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class WorkoutRoutineUpdate extends Vue {
  @Inject('workoutRoutineService') private workoutRoutineService: () => WorkoutRoutineService;
  @Inject('alertService') private alertService: () => AlertService;

  public workoutRoutine: IWorkoutRoutine = new WorkoutRoutine();

  @Inject('workoutRoutineExerciseService') private workoutRoutineExerciseService: () => WorkoutRoutineExerciseService;

  public workoutRoutineExercises: IWorkoutRoutineExercise[] = [];

  @Inject('workoutService') private workoutService: () => WorkoutService;

  public workouts: IWorkout[] = [];

  @Inject('workoutRoutineGroupService') private workoutRoutineGroupService: () => WorkoutRoutineGroupService;

  public workoutRoutineGroups: IWorkoutRoutineGroup[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutRoutineId) {
        vm.retrieveWorkoutRoutine(to.params.workoutRoutineId);
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
    if (this.workoutRoutine.id) {
      this.workoutRoutineService()
        .update(this.workoutRoutine)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutine.updated', { param: param.id });
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
      this.workoutRoutineService()
        .create(this.workoutRoutine)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workoutRoutine.created', { param: param.id });
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

  public retrieveWorkoutRoutine(workoutRoutineId): void {
    this.workoutRoutineService()
      .find(workoutRoutineId)
      .then(res => {
        this.workoutRoutine = res;
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
    this.workoutService()
      .retrieve()
      .then(res => {
        this.workouts = res.data;
      });
    this.workoutRoutineGroupService()
      .retrieve()
      .then(res => {
        this.workoutRoutineGroups = res.data;
      });
  }
}
