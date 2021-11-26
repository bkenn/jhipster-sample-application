/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineUpdateComponent from '@/entities/workout-routine/workout-routine-update.vue';
import WorkoutRoutineClass from '@/entities/workout-routine/workout-routine-update.component';
import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';

import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';

import WorkoutService from '@/entities/workout/workout.service';

import WorkoutRoutineGroupService from '@/entities/workout-routine-group/workout-routine-group.service';
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
  describe('WorkoutRoutine Management Update Component', () => {
    let wrapper: Wrapper<WorkoutRoutineClass>;
    let comp: WorkoutRoutineClass;
    let workoutRoutineServiceStub: SinonStubbedInstance<WorkoutRoutineService>;

    beforeEach(() => {
      workoutRoutineServiceStub = sinon.createStubInstance<WorkoutRoutineService>(WorkoutRoutineService);

      wrapper = shallowMount<WorkoutRoutineClass>(WorkoutRoutineUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutRoutineService: () => workoutRoutineServiceStub,
          alertService: () => new AlertService(),

          workoutRoutineExerciseService: () => new WorkoutRoutineExerciseService(),

          workoutService: () => new WorkoutService(),

          workoutRoutineGroupService: () => new WorkoutRoutineGroupService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workoutRoutine = entity;
        workoutRoutineServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workoutRoutine = entity;
        workoutRoutineServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutine = { id: 123 };
        workoutRoutineServiceStub.find.resolves(foundWorkoutRoutine);
        workoutRoutineServiceStub.retrieve.resolves([foundWorkoutRoutine]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutRoutineId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutine).toBe(foundWorkoutRoutine);
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
