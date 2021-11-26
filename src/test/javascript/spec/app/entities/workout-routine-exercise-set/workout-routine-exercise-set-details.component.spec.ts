/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineExerciseSetDetailComponent from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set-details.vue';
import WorkoutRoutineExerciseSetClass from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set-details.component';
import WorkoutRoutineExerciseSetService from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.service';
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
  describe('WorkoutRoutineExerciseSet Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutRoutineExerciseSetClass>;
    let comp: WorkoutRoutineExerciseSetClass;
    let workoutRoutineExerciseSetServiceStub: SinonStubbedInstance<WorkoutRoutineExerciseSetService>;

    beforeEach(() => {
      workoutRoutineExerciseSetServiceStub = sinon.createStubInstance<WorkoutRoutineExerciseSetService>(WorkoutRoutineExerciseSetService);

      wrapper = shallowMount<WorkoutRoutineExerciseSetClass>(WorkoutRoutineExerciseSetDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutRoutineExerciseSetService: () => workoutRoutineExerciseSetServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkoutRoutineExerciseSet = { id: 123 };
        workoutRoutineExerciseSetServiceStub.find.resolves(foundWorkoutRoutineExerciseSet);

        // WHEN
        comp.retrieveWorkoutRoutineExerciseSet(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutineExerciseSet).toBe(foundWorkoutRoutineExerciseSet);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutineExerciseSet = { id: 123 };
        workoutRoutineExerciseSetServiceStub.find.resolves(foundWorkoutRoutineExerciseSet);

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
