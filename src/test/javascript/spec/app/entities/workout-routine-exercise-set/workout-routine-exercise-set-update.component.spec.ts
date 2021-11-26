/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineExerciseSetUpdateComponent from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set-update.vue';
import WorkoutRoutineExerciseSetClass from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set-update.component';
import WorkoutRoutineExerciseSetService from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.service';

import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';
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
  describe('WorkoutRoutineExerciseSet Management Update Component', () => {
    let wrapper: Wrapper<WorkoutRoutineExerciseSetClass>;
    let comp: WorkoutRoutineExerciseSetClass;
    let workoutRoutineExerciseSetServiceStub: SinonStubbedInstance<WorkoutRoutineExerciseSetService>;

    beforeEach(() => {
      workoutRoutineExerciseSetServiceStub = sinon.createStubInstance<WorkoutRoutineExerciseSetService>(WorkoutRoutineExerciseSetService);

      wrapper = shallowMount<WorkoutRoutineExerciseSetClass>(WorkoutRoutineExerciseSetUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutRoutineExerciseSetService: () => workoutRoutineExerciseSetServiceStub,
          alertService: () => new AlertService(),

          workoutRoutineExerciseService: () => new WorkoutRoutineExerciseService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workoutRoutineExerciseSet = entity;
        workoutRoutineExerciseSetServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineExerciseSetServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workoutRoutineExerciseSet = entity;
        workoutRoutineExerciseSetServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineExerciseSetServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutineExerciseSet = { id: 123 };
        workoutRoutineExerciseSetServiceStub.find.resolves(foundWorkoutRoutineExerciseSet);
        workoutRoutineExerciseSetServiceStub.retrieve.resolves([foundWorkoutRoutineExerciseSet]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutRoutineExerciseSetId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutineExerciseSet).toBe(foundWorkoutRoutineExerciseSet);
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
