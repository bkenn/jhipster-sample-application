/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ExerciseCategoryComponent from '@/entities/exercise-category/exercise-category.vue';
import ExerciseCategoryClass from '@/entities/exercise-category/exercise-category.component';
import ExerciseCategoryService from '@/entities/exercise-category/exercise-category.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('ExerciseCategory Management Component', () => {
    let wrapper: Wrapper<ExerciseCategoryClass>;
    let comp: ExerciseCategoryClass;
    let exerciseCategoryServiceStub: SinonStubbedInstance<ExerciseCategoryService>;

    beforeEach(() => {
      exerciseCategoryServiceStub = sinon.createStubInstance<ExerciseCategoryService>(ExerciseCategoryService);
      exerciseCategoryServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ExerciseCategoryClass>(ExerciseCategoryComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          exerciseCategoryService: () => exerciseCategoryServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      exerciseCategoryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllExerciseCategorys();
      await comp.$nextTick();

      // THEN
      expect(exerciseCategoryServiceStub.retrieve.called).toBeTruthy();
      expect(comp.exerciseCategories[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      exerciseCategoryServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeExerciseCategory();
      await comp.$nextTick();

      // THEN
      expect(exerciseCategoryServiceStub.delete.called).toBeTruthy();
      expect(exerciseCategoryServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
