/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutExerciseSetDetailComponent from '@/entities/workout-exercise-set/workout-exercise-set-details.vue';
import WorkoutExerciseSetClass from '@/entities/workout-exercise-set/workout-exercise-set-details.component';
import WorkoutExerciseSetService from '@/entities/workout-exercise-set/workout-exercise-set.service';
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
  describe('WorkoutExerciseSet Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutExerciseSetClass>;
    let comp: WorkoutExerciseSetClass;
    let workoutExerciseSetServiceStub: SinonStubbedInstance<WorkoutExerciseSetService>;

    beforeEach(() => {
      workoutExerciseSetServiceStub = sinon.createStubInstance<WorkoutExerciseSetService>(WorkoutExerciseSetService);

      wrapper = shallowMount<WorkoutExerciseSetClass>(WorkoutExerciseSetDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutExerciseSetService: () => workoutExerciseSetServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkoutExerciseSet = { id: 123 };
        workoutExerciseSetServiceStub.find.resolves(foundWorkoutExerciseSet);

        // WHEN
        comp.retrieveWorkoutExerciseSet(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workoutExerciseSet).toBe(foundWorkoutExerciseSet);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutExerciseSet = { id: 123 };
        workoutExerciseSetServiceStub.find.resolves(foundWorkoutExerciseSet);

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
