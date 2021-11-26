/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WorkoutRoutineExerciseSetComponent from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.vue';
import WorkoutRoutineExerciseSetClass from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.component';
import WorkoutRoutineExerciseSetService from '@/entities/workout-routine-exercise-set/workout-routine-exercise-set.service';
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
  describe('WorkoutRoutineExerciseSet Management Component', () => {
    let wrapper: Wrapper<WorkoutRoutineExerciseSetClass>;
    let comp: WorkoutRoutineExerciseSetClass;
    let workoutRoutineExerciseSetServiceStub: SinonStubbedInstance<WorkoutRoutineExerciseSetService>;

    beforeEach(() => {
      workoutRoutineExerciseSetServiceStub = sinon.createStubInstance<WorkoutRoutineExerciseSetService>(WorkoutRoutineExerciseSetService);
      workoutRoutineExerciseSetServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<WorkoutRoutineExerciseSetClass>(WorkoutRoutineExerciseSetComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          workoutRoutineExerciseSetService: () => workoutRoutineExerciseSetServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      workoutRoutineExerciseSetServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllWorkoutRoutineExerciseSets();
      await comp.$nextTick();

      // THEN
      expect(workoutRoutineExerciseSetServiceStub.retrieve.called).toBeTruthy();
      expect(comp.workoutRoutineExerciseSets[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      workoutRoutineExerciseSetServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeWorkoutRoutineExerciseSet();
      await comp.$nextTick();

      // THEN
      expect(workoutRoutineExerciseSetServiceStub.delete.called).toBeTruthy();
      expect(workoutRoutineExerciseSetServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
