import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';
import { IWorkoutExercise } from '@/shared/model/workout-exercise.model';

import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
import { IWorkoutRoutine } from '@/shared/model/workout-routine.model';

import UserOAuth2Service from '@/entities/user/user.oauth2.service';

import { IWorkout, Workout } from '@/shared/model/workout.model';
import WorkoutService from './workout.service';

const validations: any = {
  workout: {
    title: {},
    description: {},
    workoutStartDateTime: {},
    workoutEndDateTime: {},
  },
};

@Component({
  validations,
})
export default class WorkoutUpdate extends Vue {
  @Inject('workoutService') private workoutService: () => WorkoutService;
  @Inject('alertService') private alertService: () => AlertService;

  public workout: IWorkout = new Workout();

  @Inject('workoutExerciseService') private workoutExerciseService: () => WorkoutExerciseService;

  public workoutExercises: IWorkoutExercise[] = [];

  @Inject('workoutRoutineService') private workoutRoutineService: () => WorkoutRoutineService;

  public workoutRoutines: IWorkoutRoutine[] = [];

  @Inject('userOAuth2Service') private userOAuth2Service: () => UserOAuth2Service;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.workoutId) {
        vm.retrieveWorkout(to.params.workoutId);
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
    if (this.workout.id) {
      this.workoutService()
        .update(this.workout)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workout.updated', { param: param.id });
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
      this.workoutService()
        .create(this.workout)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.workout.created', { param: param.id });
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.workout[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.workout[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.workout[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.workout[field] = null;
    }
  }

  public retrieveWorkout(workoutId): void {
    this.workoutService()
      .find(workoutId)
      .then(res => {
        res.workoutStartDateTime = new Date(res.workoutStartDateTime);
        res.workoutEndDateTime = new Date(res.workoutEndDateTime);
        this.workout = res;
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
    this.workoutRoutineService()
      .retrieve()
      .then(res => {
        this.workoutRoutines = res.data;
      });
    this.userOAuth2Service()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
