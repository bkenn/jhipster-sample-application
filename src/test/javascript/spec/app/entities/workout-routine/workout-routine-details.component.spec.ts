/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineDetailComponent from '@/entities/workout-routine/workout-routine-details.vue';
import WorkoutRoutineClass from '@/entities/workout-routine/workout-routine-details.component';
import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
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
  describe('WorkoutRoutine Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutRoutineClass>;
    let comp: WorkoutRoutineClass;
    let workoutRoutineServiceStub: SinonStubbedInstance<WorkoutRoutineService>;

    beforeEach(() => {
      workoutRoutineServiceStub = sinon.createStubInstance<WorkoutRoutineService>(WorkoutRoutineService);

      wrapper = shallowMount<WorkoutRoutineClass>(WorkoutRoutineDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutRoutineService: () => workoutRoutineServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkoutRoutine = { id: 123 };
        workoutRoutineServiceStub.find.resolves(foundWorkoutRoutine);

        // WHEN
        comp.retrieveWorkoutRoutine(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutine).toBe(foundWorkoutRoutine);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutine = { id: 123 };
        workoutRoutineServiceStub.find.resolves(foundWorkoutRoutine);

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
