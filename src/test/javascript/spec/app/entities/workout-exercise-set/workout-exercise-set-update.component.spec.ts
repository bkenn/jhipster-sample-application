/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutExerciseSetUpdateComponent from '@/entities/workout-exercise-set/workout-exercise-set-update.vue';
import WorkoutExerciseSetClass from '@/entities/workout-exercise-set/workout-exercise-set-update.component';
import WorkoutExerciseSetService from '@/entities/workout-exercise-set/workout-exercise-set.service';

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
  describe('WorkoutExerciseSet Management Update Component', () => {
    let wrapper: Wrapper<WorkoutExerciseSetClass>;
    let comp: WorkoutExerciseSetClass;
    let workoutExerciseSetServiceStub: SinonStubbedInstance<WorkoutExerciseSetService>;

    beforeEach(() => {
      workoutExerciseSetServiceStub = sinon.createStubInstance<WorkoutExerciseSetService>(WorkoutExerciseSetService);

      wrapper = shallowMount<WorkoutExerciseSetClass>(WorkoutExerciseSetUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutExerciseSetService: () => workoutExerciseSetServiceStub,
          alertService: () => new AlertService(),

          workoutExerciseService: () => new WorkoutExerciseService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workoutExerciseSet = entity;
        workoutExerciseSetServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutExerciseSetServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workoutExerciseSet = entity;
        workoutExerciseSetServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutExerciseSetServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutExerciseSet = { id: 123 };
        workoutExerciseSetServiceStub.find.resolves(foundWorkoutExerciseSet);
        workoutExerciseSetServiceStub.retrieve.resolves([foundWorkoutExerciseSet]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutExerciseSetId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workoutExerciseSet).toBe(foundWorkoutExerciseSet);
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
