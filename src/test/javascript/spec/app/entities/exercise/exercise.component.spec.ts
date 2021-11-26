/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ExerciseComponent from '@/entities/exercise/exercise.vue';
import ExerciseClass from '@/entities/exercise/exercise.component';
import ExerciseService from '@/entities/exercise/exercise.service';
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
  describe('Exercise Management Component', () => {
    let wrapper: Wrapper<ExerciseClass>;
    let comp: ExerciseClass;
    let exerciseServiceStub: SinonStubbedInstance<ExerciseService>;

    beforeEach(() => {
      exerciseServiceStub = sinon.createStubInstance<ExerciseService>(ExerciseService);
      exerciseServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ExerciseClass>(ExerciseComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          exerciseService: () => exerciseServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      exerciseServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllExercises();
      await comp.$nextTick();

      // THEN
      expect(exerciseServiceStub.retrieve.called).toBeTruthy();
      expect(comp.exercises[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      exerciseServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeExercise();
      await comp.$nextTick();

      // THEN
      expect(exerciseServiceStub.delete.called).toBeTruthy();
      expect(exerciseServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
