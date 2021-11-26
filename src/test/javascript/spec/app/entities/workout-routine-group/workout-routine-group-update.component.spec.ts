/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineGroupUpdateComponent from '@/entities/workout-routine-group/workout-routine-group-update.vue';
import WorkoutRoutineGroupClass from '@/entities/workout-routine-group/workout-routine-group-update.component';
import WorkoutRoutineGroupService from '@/entities/workout-routine-group/workout-routine-group.service';

import WorkoutRoutineService from '@/entities/workout-routine/workout-routine.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('WorkoutRoutineGroup Management Update Component', () => {
    let wrapper: Wrapper<WorkoutRoutineGroupClass>;
    let comp: WorkoutRoutineGroupClass;
    let workoutRoutineGroupServiceStub: SinonStubbedInstance<WorkoutRoutineGroupService>;

    beforeEach(() => {
      workoutRoutineGroupServiceStub = sinon.createStubInstance<WorkoutRoutineGroupService>(WorkoutRoutineGroupService);

      wrapper = shallowMount<WorkoutRoutineGroupClass>(WorkoutRoutineGroupUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          workoutRoutineGroupService: () => workoutRoutineGroupServiceStub,
          alertService: () => new AlertService(),

          workoutRoutineService: () => new WorkoutRoutineService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.workoutRoutineGroup = entity;
        workoutRoutineGroupServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineGroupServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.workoutRoutineGroup = entity;
        workoutRoutineGroupServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(workoutRoutineGroupServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutineGroup = { id: 123 };
        workoutRoutineGroupServiceStub.find.resolves(foundWorkoutRoutineGroup);
        workoutRoutineGroupServiceStub.retrieve.resolves([foundWorkoutRoutineGroup]);

        // WHEN
        comp.beforeRouteEnter({ params: { workoutRoutineGroupId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutineGroup).toBe(foundWorkoutRoutineGroup);
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
