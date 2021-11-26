/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WorkoutRoutineGroupDetailComponent from '@/entities/workout-routine-group/workout-routine-group-details.vue';
import WorkoutRoutineGroupClass from '@/entities/workout-routine-group/workout-routine-group-details.component';
import WorkoutRoutineGroupService from '@/entities/workout-routine-group/workout-routine-group.service';
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
  describe('WorkoutRoutineGroup Management Detail Component', () => {
    let wrapper: Wrapper<WorkoutRoutineGroupClass>;
    let comp: WorkoutRoutineGroupClass;
    let workoutRoutineGroupServiceStub: SinonStubbedInstance<WorkoutRoutineGroupService>;

    beforeEach(() => {
      workoutRoutineGroupServiceStub = sinon.createStubInstance<WorkoutRoutineGroupService>(WorkoutRoutineGroupService);

      wrapper = shallowMount<WorkoutRoutineGroupClass>(WorkoutRoutineGroupDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { workoutRoutineGroupService: () => workoutRoutineGroupServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWorkoutRoutineGroup = { id: 123 };
        workoutRoutineGroupServiceStub.find.resolves(foundWorkoutRoutineGroup);

        // WHEN
        comp.retrieveWorkoutRoutineGroup(123);
        await comp.$nextTick();

        // THEN
        expect(comp.workoutRoutineGroup).toBe(foundWorkoutRoutineGroup);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWorkoutRoutineGroup = { id: 123 };
        workoutRoutineGroupServiceStub.find.resolves(foundWorkoutRoutineGroup);

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
