/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MuscleDetailComponent from '@/entities/muscle/muscle-details.vue';
import MuscleClass from '@/entities/muscle/muscle-details.component';
import MuscleService from '@/entities/muscle/muscle.service';
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
  describe('Muscle Management Detail Component', () => {
    let wrapper: Wrapper<MuscleClass>;
    let comp: MuscleClass;
    let muscleServiceStub: SinonStubbedInstance<MuscleService>;

    beforeEach(() => {
      muscleServiceStub = sinon.createStubInstance<MuscleService>(MuscleService);

      wrapper = shallowMount<MuscleClass>(MuscleDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { muscleService: () => muscleServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMuscle = { id: 123 };
        muscleServiceStub.find.resolves(foundMuscle);

        // WHEN
        comp.retrieveMuscle(123);
        await comp.$nextTick();

        // THEN
        expect(comp.muscle).toBe(foundMuscle);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMuscle = { id: 123 };
        muscleServiceStub.find.resolves(foundMuscle);

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
