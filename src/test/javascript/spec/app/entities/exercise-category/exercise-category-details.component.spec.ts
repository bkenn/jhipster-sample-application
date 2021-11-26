/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ExerciseCategoryDetailComponent from '@/entities/exercise-category/exercise-category-details.vue';
import ExerciseCategoryClass from '@/entities/exercise-category/exercise-category-details.component';
import ExerciseCategoryService from '@/entities/exercise-category/exercise-category.service';
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
  describe('ExerciseCategory Management Detail Component', () => {
    let wrapper: Wrapper<ExerciseCategoryClass>;
    let comp: ExerciseCategoryClass;
    let exerciseCategoryServiceStub: SinonStubbedInstance<ExerciseCategoryService>;

    beforeEach(() => {
      exerciseCategoryServiceStub = sinon.createStubInstance<ExerciseCategoryService>(ExerciseCategoryService);

      wrapper = shallowMount<ExerciseCategoryClass>(ExerciseCategoryDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { exerciseCategoryService: () => exerciseCategoryServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundExerciseCategory = { id: 123 };
        exerciseCategoryServiceStub.find.resolves(foundExerciseCategory);

        // WHEN
        comp.retrieveExerciseCategory(123);
        await comp.$nextTick();

        // THEN
        expect(comp.exerciseCategory).toBe(foundExerciseCategory);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExerciseCategory = { id: 123 };
        exerciseCategoryServiceStub.find.resolves(foundExerciseCategory);

        // WHEN
        comp.beforeRouteEnter({ params: { exerciseCategoryId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.exerciseCategory).toBe(foundExerciseCategory);
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
