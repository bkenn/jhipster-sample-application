/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineExerciseUpdateComponent from '@/entities/workout-routine-exercise/workout-routine-exercise-update.vue';
import WorkoutRoutineExerciseClass from '@/entities/workout-routine-exercise/workout-routine-exercise-update.component';
import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';

import WorkoutRoutineExerciseSetService from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.service';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';

import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
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
  describe('WorkoutRoutineExercise Management Update Component', () => {
    let wrapper: Wrapper<WorkoutRoutineExerciseClass>;
    let comp: WorkoutRoutineExerciseClass;
    let workoutRoutineExerciseServiceStub: SinonStubbedInstance<WorkoutRoutineExerciseService>;

    beforeEach(() => {
      workoutRoutineExerciseServiceStub = sinon.createStubInstance<WorkoutRoutineExerciseService>(WorkoutRoutineExerciseService);

      wrapper = shallowMount<WorkoutRoutineExerciseClass>(WorkoutRoutineExerciseUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutRoutineExerciseService: () => workoutRoutineExerciseServiceStub,
          alertService: () => new AlertService(),

          workoutRoutineExerciseSetService: () => new WorkoutRoutineExerciseSetService(),

          workoutExerciseService: () => new WorkoutExerciseService(),

          workoutRoutineService: () => new WorkoutRoutineService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workoutRoutineExercise = entity;
        workoutRoutineExerciseServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineExerciseServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workoutRoutineExercise = entity;
        workoutRoutineExerciseServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineExerciseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutineExercise = { id: 123 };
        workoutRoutineExerciseServiceStub.find.resolves(foundWorkoutRoutineExercise);
        workoutRoutineExerciseServiceStub.retrieve.resolves([foundWorkoutRoutineExercise]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutRoutineExerciseId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutineExercise).toBe(foundWorkoutRoutineExercise);
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
