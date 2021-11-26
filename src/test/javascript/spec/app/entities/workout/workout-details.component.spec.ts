/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutDetailComponent from '@/entities/workout/workout-details.vue';
import WorkoutClass from '@/entities/workout/workout-details.component';
import WorkoutService from '@/entities/workout/workout.service';
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
  describe('Workout Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutClass>;
    let comp: WorkoutClass;
    let workoutServiceStub: SinonStubbedInstance<WorkoutService>;

    beforeEach(() => {
      workoutServiceStub = sinon.createStubInstance<WorkoutService>(WorkoutService);

      wrapper = shallowMount<WorkoutClass>(WorkoutDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutService: () => workoutServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkout = { id: 123 };
        workoutServiceStub.find.resolves(foundWorkout);

        // WHEN
        comp.retrieveWorkout(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workout).toBe(foundWorkout);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkout = { id: 123 };
        workoutServiceStub.find.resolves(foundWorkout);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workout).toBe(foundWorkout);
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
