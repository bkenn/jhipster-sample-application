/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutExerciseDetailComponent from '@/entities/workout-exercise/workout-exercise-details.vue';
import WorkoutExerciseClass from '@/entities/workout-exercise/workout-exercise-details.component';
import WorkoutExerciseService from '@/entities/workout-exercise/workout-exercise.service';
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
  describe('WorkoutExercise Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutExerciseClass>;
    let comp: WorkoutExerciseClass;
    let workoutExerciseServiceStub: SinonStubbedInstance<WorkoutExerciseService>;

    beforeEach(() => {
      workoutExerciseServiceStub = sinon.createStubInstance<WorkoutExerciseService>(WorkoutExerciseService);

      wrapper = shallowMount<WorkoutExerciseClass>(WorkoutExerciseDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutExerciseService: () => workoutExerciseServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkoutExercise = { id: 123 };
        workoutExerciseServiceStub.find.resolves(foundWorkoutExercise);

        // WHEN
        comp.retrieveWorkoutExercise(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workoutExercise).toBe(foundWorkoutExercise);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutExercise = { id: 123 };
        workoutExerciseServiceStub.find.resolves(foundWorkoutExercise);

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
