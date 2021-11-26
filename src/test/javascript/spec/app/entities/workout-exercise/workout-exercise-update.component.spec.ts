/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutExerciseUpdateComponent from '@/entities/workout-exercise/workout-exercise-update.vue';
import WorkoutExerciseClass from '@/entities/workout-exercise/workout-exercise-update.component';
import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';

import WorkoutExerciseSetService from '@/entities/workout-exercise-set/workout-exercise-set.service';

import ExerciseService from '@/entities/exercise/exercise.service';

import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';

import WorkoutService from '@/entities/workout/workout.service';
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
  describe('WorkoutExercise Management Update Component', () => {
    let wrapper: Wrapper<WorkoutExerciseClass>;
    let comp: WorkoutExerciseClass;
    let workoutExerciseServiceStub: SinonStubbedInstance<WorkoutExerciseService>;

    beforeEach(() => {
      workoutExerciseServiceStub = sinon.createStubInstance<WorkoutExerciseService>(WorkoutExerciseService);

      wrapper = shallowMount<WorkoutExerciseClass>(WorkoutExerciseUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutExerciseService: () => workoutExerciseServiceStub,
          alertService: () => new AlertService(),

          workoutExerciseSetService: () => new WorkoutExerciseSetService(),

          exerciseService: () => new ExerciseService(),

          workoutRoutineExerciseService: () => new WorkoutRoutineExerciseService(),

          workoutService: () => new WorkoutService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workoutExercise = entity;
        workoutExerciseServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutExerciseServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workoutExercise = entity;
        workoutExerciseServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutExerciseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutExercise = { id: 123 };
        workoutExerciseServiceStub.find.resolves(foundWorkoutExercise);
        workoutExerciseServiceStub.retrieve.resolves([foundWorkoutExercise]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutExerciseId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workoutExercise).toBe(foundWorkoutExercise);
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
