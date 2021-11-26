/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WorkoutRoutineExerciseComponent from '@/entities/workout-routine-exercise/workout-routine-exercise.vue';
import WorkoutRoutineExerciseClass from '@/entities/workout-routine-exercise/workout-routine-exercise.component';
import WorkoutRoutineExerciseService from '@/entities/workout-routine-exercise/workout-routine-exercise.service';
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
  describe('WorkoutRoutineExercise Management Component', () => {
    let wrapper: Wrapper<WorkoutRoutineExerciseClass>;
    let comp: WorkoutRoutineExerciseClass;
    let workoutRoutineExerciseServiceStub: SinonStubbedInstance<WorkoutRoutineExerciseService>;

    beforeEach(() => {
      workoutRoutineExerciseServiceStub = sinon.createStubInstance<WorkoutRoutineExerciseService>(WorkoutRoutineExerciseService);
      workoutRoutineExerciseServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<WorkoutRoutineExerciseClass>(WorkoutRoutineExerciseComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          workoutRoutineExerciseService: () => workoutRoutineExerciseServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      workoutRoutineExerciseServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllWorkoutRoutineExercises();
      await comp.$nextTick();

      // THEN
      expect(workoutRoutineExerciseServiceStub.retrieve.called).toBeTruthy();
      expect(comp.workoutRoutineExercises[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      workoutRoutineExerciseServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeWorkoutRoutineExercise();
      await comp.$nextTick();

      // THEN
      expect(workoutRoutineExerciseServiceStub.delete.called).toBeTruthy();
      expect(workoutRoutineExerciseServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
