/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import WorkoutUpdateComponent from '@/entities/workout/workout-update.vue';
import WorkoutClass from '@/entities/workout/workout-update.component';
import WorkoutService from '@/entities/workout/workout.service';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';

import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
import UserOAuth2Service from '@/entities/user/user.oauth2.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Workout Management Update Component', () => {
    let wrapper: Wrapper<WorkoutClass>;
    let comp: WorkoutClass;
    let workoutServiceStub: SinonStubbedInstance<WorkoutService>;

    beforeEach(() => {
      workoutServiceStub = sinon.createStubInstance<WorkoutService>(WorkoutService);

      wrapper = shallowMount<WorkoutClass>(WorkoutUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutService: () => workoutServiceStub,
          alertService: () => new AlertService(),

          workoutExerciseService: () => new WorkoutExerciseService(),

          workoutRoutineService: () => new WorkoutRoutineService(),

          userOAuth2Service: () => new UserOAuth2Service(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workout = entity;
        workoutServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workout = entity;
        workoutServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkout = { id: 123 };
        workoutServiceStub.find.resolves(foundWorkout);
        workoutServiceStub.retrieve.resolves([foundWorkout]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workout).toBe(foundWorkout);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
