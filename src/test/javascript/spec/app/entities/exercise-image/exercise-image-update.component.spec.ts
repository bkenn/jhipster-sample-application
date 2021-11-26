/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ExerciseImageUpdateComponent from '@/entities/exercise-image/exercise-image-update.vue';
import ExerciseImageClass from '@/entities/exercise-image/exercise-image-update.component';
import ExerciseImageService from '@/entities/exercise-image/exercise-image.service';

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
  describe('ExerciseImage Management Update Component', () => {
    let wrapper: Wrapper<ExerciseImageClass>;
    let comp: ExerciseImageClass;
    let exerciseImageServiceStub: SinonStubbedInstance<ExerciseImageService>;

    beforeEach(() => {
      exerciseImageServiceStub = sinon.createStubInstance<ExerciseImageService>(ExerciseImageService);

      wrapper = shallowMount<ExerciseImageClass>(ExerciseImageUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          exerciseImageService: () => exerciseImageServiceStub,
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
        comp.exerciseImage = entity;
        exerciseImageServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(exerciseImageServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.exerciseImage = entity;
        exerciseImageServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(exerciseImageServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExerciseImage = { id: 123 };
        exerciseImageServiceStub.find.resolves(foundExerciseImage);
        exerciseImageServiceStub.retrieve.resolves([foundExerciseImage]);

        // WHEN
        comp.beforeRouteEnter({ params: { exerciseImageId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.exerciseImage).toBe(foundExerciseImage);
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
