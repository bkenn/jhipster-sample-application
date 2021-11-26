/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WorkoutComponent from '@/entities/workout/workout.vue';
import WorkoutClass from '@/entities/workout/workout.component';
import WorkoutService from '@/entities/workout/workout.service';
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
  describe('Workout Management Component', () => {
    let wrapper: Wrapper<WorkoutClass>;
    let comp: WorkoutClass;
    let workoutServiceStub: SinonStubbedInstance<WorkoutService>;

    beforeEach(() => {
      workoutServiceStub = sinon.createStubInstance<WorkoutService>(WorkoutService);
      workoutServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<WorkoutClass>(WorkoutComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          workoutService: () => workoutServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      workoutServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllWorkouts();
      await comp.$nextTick();

      // THEN
      expect(workoutServiceStub.retrieve.called).toBeTruthy();
      expect(comp.workouts[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      workoutServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeWorkout();
      await comp.$nextTick();

      // THEN
      expect(workoutServiceStub.delete.called).toBeTruthy();
      expect(workoutServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
