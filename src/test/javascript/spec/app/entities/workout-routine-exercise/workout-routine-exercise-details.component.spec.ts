/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineExerciseDetailComponent from '@/entities/workout-routine-exercise/workout-routine-exercise-details.vue';
import WorkoutRoutineExerciseClass from '@/entities/workout-routine-exercise/workout-routine-exercise-details.component';
import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('WorkoutRoutineExercise Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutRoutineExerciseClass>;
    let comp: WorkoutRoutineExerciseClass;
    let workoutRoutineExerciseServiceStub: SinonStubbedInstance<WorkoutRoutineExerciseService>;

    beforeEach(() => {
      workoutRoutineExerciseServiceStub = sinon.createStubInstance<WorkoutRoutineExerciseService>(WorkoutRoutineExerciseService);

      wrapper = shallowMount<WorkoutRoutineExerciseClass>(WorkoutRoutineExerciseDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutRoutineExerciseService: () => workoutRoutineExerciseServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkoutRoutineExercise = { id: 123 };
        workoutRoutineExerciseServiceStub.find.resolves(foundWorkoutRoutineExercise);

        // WHEN
        comp.retrieveWorkoutRoutineExercise(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutineExercise).toBe(foundWorkoutRoutineExercise);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutineExercise = { id: 123 };
        workoutRoutineExerciseServiceStub.find.resolves(foundWorkoutRoutineExercise);

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
