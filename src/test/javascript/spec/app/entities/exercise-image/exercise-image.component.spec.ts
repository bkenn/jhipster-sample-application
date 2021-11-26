/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ExerciseImageComponent from '@/entities/exercise-image/exercise-image.vue';
import ExerciseImageClass from '@/entities/exercise-image/exercise-image.component';
import ExerciseImageService from '@/entities/exercise-image/exercise-image.service';
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
  describe('ExerciseImage Management Component', () => {
    let wrapper: Wrapper<ExerciseImageClass>;
    let comp: ExerciseImageClass;
    let exerciseImageServiceStub: SinonStubbedInstance<ExerciseImageService>;

    beforeEach(() => {
      exerciseImageServiceStub = sinon.createStubInstance<ExerciseImageService>(ExerciseImageService);
      exerciseImageServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ExerciseImageClass>(ExerciseImageComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          exerciseImageService: () => exerciseImageServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      exerciseImageServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllExerciseImages();
      await comp.$nextTick();

      // THEN
      expect(exerciseImageServiceStub.retrieve.called).toBeTruthy();
      expect(comp.exerciseImages[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      exerciseImageServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeExerciseImage();
      await comp.$nextTick();

      // THEN
      expect(exerciseImageServiceStub.delete.called).toBeTruthy();
      expect(exerciseImageServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
