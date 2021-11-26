/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import MuscleUpdateComponent from '@/entities/muscle/muscle-update.vue';
import MuscleClass from '@/entities/muscle/muscle-update.component';
import MuscleService from '@/entities/muscle/muscle.service';

import ExerciseService from '@/entities/exercise/exercise.service';
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
  describe('Muscle Management Update Component', () => {
    let wrapper: Wrapper<MuscleClass>;
    let comp: MuscleClass;
    let muscleServiceStub: SinonStubbedInstance<MuscleService>;

    beforeEach(() => {
      muscleServiceStub = sinon.createStubInstance<MuscleService>(MuscleService);

      wrapper = shallowMount<MuscleClass>(MuscleUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          muscleService: () => muscleServiceStub,
          alertService: () => new AlertService(),

          exerciseService: () => new ExerciseService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.muscle = entity;
        muscleServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(muscleServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.muscle = entity;
        muscleServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(muscleServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMuscle = { id: 123 };
        muscleServiceStub.find.resolves(foundMuscle);
        muscleServiceStub.retrieve.resolves([foundMuscle]);

        // WHEN
        comp.beforeRouteEnter({ params: { muscleId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.muscle).toBe(foundMuscle);
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
