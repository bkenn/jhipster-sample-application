/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WorkoutExerciseSetComponent from '@/entities/workout-exercise-set/workout-exercise-set.vue';
import WorkoutExerciseSetClass from '@/entities/workout-exercise-set/workout-exercise-set.component';
import WorkoutExerciseSetService from '@/entities/workout-exercise-set/workout-exercise-set.service';
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
  describe('WorkoutExerciseSet Management Component', () => {
    let wrapper: Wrapper<WorkoutExerciseSetClass>;
    let comp: WorkoutExerciseSetClass;
    let workoutExerciseSetServiceStub: SinonStubbedInstance<WorkoutExerciseSetService>;

    beforeEach(() => {
      workoutExerciseSetServiceStub = sinon.createStubInstance<WorkoutExerciseSetService>(WorkoutExerciseSetService);
      workoutExerciseSetServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<WorkoutExerciseSetClass>(WorkoutExerciseSetComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          workoutExerciseSetService: () => workoutExerciseSetServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      workoutExerciseSetServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllWorkoutExerciseSets();
      await comp.$nextTick();

      // THEN
      expect(workoutExerciseSetServiceStub.retrieve.called).toBeTruthy();
      expect(comp.workoutExerciseSets[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      workoutExerciseSetServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeWorkoutExerciseSet();
      await comp.$nextTick();

      // THEN
      expect(workoutExerciseSetServiceStub.delete.called).toBeTruthy();
      expect(workoutExerciseSetServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
