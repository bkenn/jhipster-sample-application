/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WorkoutRoutineComponent from '@/entities/workout-routine/workout-routine.vue';
import WorkoutRoutineClass from '@/entities/workout-routine/workout-routine.component';
import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
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
  describe('WorkoutRoutine Management Component', () => {
    let wrapper: Wrapper<WorkoutRoutineClass>;
    let comp: WorkoutRoutineClass;
    let workoutRoutineServiceStub: SinonStubbedInstance<WorkoutRoutineService>;

    beforeEach(() => {
      workoutRoutineServiceStub = sinon.createStubInstance<WorkoutRoutineService>(WorkoutRoutineService);
      workoutRoutineServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<WorkoutRoutineClass>(WorkoutRoutineComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          workoutRoutineService: () => workoutRoutineServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      workoutRoutineServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllWorkoutRoutines();
      await comp.$nextTick();

      // THEN
      expect(workoutRoutineServiceStub.retrieve.called).toBeTruthy();
      expect(comp.workoutRoutines[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      workoutRoutineServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeWorkoutRoutine();
      await comp.$nextTick();

      // THEN
      expect(workoutRoutineServiceStub.delete.called).toBeTruthy();
      expect(workoutRoutineServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
