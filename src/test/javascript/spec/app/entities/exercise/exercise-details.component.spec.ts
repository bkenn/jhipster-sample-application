/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ExerciseDetailComponent from '@/entities/exercise/exercise-details.vue';
import ExerciseClass from '@/entities/exercise/exercise-details.component';
import ExerciseService from '@/entities/exercise/exercise.service';
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
  describe('Exercise Management Detail Component', () => {
    let wrapper: Wrapper<ExerciseClass>;
    let comp: ExerciseClass;
    let exerciseServiceStub: SinonStubbedInstance<ExerciseService>;

    beforeEach(() => {
      exerciseServiceStub = sinon.createStubInstance<ExerciseService>(ExerciseService);

      wrapper = shallowMount<ExerciseClass>(ExerciseDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { exerciseService: () => exerciseServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundExercise = { id: 123 };
        exerciseServiceStub.find.resolves(foundExercise);

        // WHEN
        comp.retrieveExercise(123);
        await comp.$nextTick();

        // THEN
        expect(comp.exercise).toBe(foundExercise);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExercise = { id: 123 };
        exerciseServiceStub.find.resolves(foundExercise);

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
