/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ExerciseUpdateComponent from '@/entities/exercise/exercise-update.vue';
import ExerciseClass from '@/entities/exercise/exercise-update.component';
import ExerciseService from '@/entities/exercise/exercise.service';

import RepTypeService from '@/entities/rep-type/rep-type.service';

import ExerciseCategoryService from '@/entities/exercise-category/exercise-category.service';

import ExerciseImageService from '@/entities/exercise-image/exercise-image.service';

import MuscleService from '@/entities/muscle/muscle.service';

import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';
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
  describe('Exercise Management Update Component', () => {
    let wrapper: Wrapper<ExerciseClass>;
    let comp: ExerciseClass;
    let exerciseServiceStub: SinonStubbedInstance<ExerciseService>;

    beforeEach(() => {
      exerciseServiceStub = sinon.createStubInstance<ExerciseService>(ExerciseService);

      wrapper = shallowMount<ExerciseClass>(ExerciseUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          exerciseService: () => exerciseServiceStub,
          alertService: () => new AlertService(),

          repTypeService: () => new RepTypeService(),

          exerciseCategoryService: () => new ExerciseCategoryService(),

          exerciseImageService: () => new ExerciseImageService(),

          muscleService: () => new MuscleService(),

          workoutExerciseService: () => new WorkoutExerciseService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.exercise = entity;
        exerciseServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(exerciseServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.exercise = entity;
        exerciseServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(exerciseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExercise = { id: 123 };
        exerciseServiceStub.find.resolves(foundExercise);
        exerciseServiceStub.retrieve.resolves([foundExercise]);

        // WHEN
        comp.beforeRouteEnter({ params: { exerciseId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.exercise).toBe(foundExercise);
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
