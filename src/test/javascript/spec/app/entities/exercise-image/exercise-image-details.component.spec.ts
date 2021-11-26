/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ExerciseImageDetailComponent from '@/entities/exercise-image/exercise-image-details.vue';
import ExerciseImageClass from '@/entities/exercise-image/exercise-image-details.component';
import ExerciseImageService from '@/entities/exercise-image/exercise-image.service';
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
  describe('ExerciseImage Management Detail Component', () => {
    let wrapper: Wrapper<ExerciseImageClass>;
    let comp: ExerciseImageClass;
    let exerciseImageServiceStub: SinonStubbedInstance<ExerciseImageService>;

    beforeEach(() => {
      exerciseImageServiceStub = sinon.createStubInstance<ExerciseImageService>(ExerciseImageService);

      wrapper = shallowMount<ExerciseImageClass>(ExerciseImageDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { exerciseImageService: () => exerciseImageServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundExerciseImage = { id: 123 };
        exerciseImageServiceStub.find.resolves(foundExerciseImage);

        // WHEN
        comp.retrieveExerciseImage(123);
        await comp.$nextTick();

        // THEN
        expect(comp.exerciseImage).toBe(foundExerciseImage);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExerciseImage = { id: 123 };
        exerciseImageServiceStub.find.resolves(foundExerciseImage);

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
