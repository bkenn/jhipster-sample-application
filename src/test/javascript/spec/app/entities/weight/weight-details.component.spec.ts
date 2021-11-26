/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import WeightDetailComponent from '@/entities/weight/weight-details.vue';
import WeightClass from '@/entities/weight/weight-details.component';
import WeightService from '@/entities/weight/weight.service';
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
  describe('Weight Management Detail Component', () => {
    let wrapper: Wrapper<WeightClass>;
    let comp: WeightClass;
    let weightServiceStub: SinonStubbedInstance<WeightService>;

    beforeEach(() => {
      weightServiceStub = sinon.createStubInstance<WeightService>(WeightService);

      wrapper = shallowMount<WeightClass>(WeightDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { weightService: () => weightServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWeight = { id: 123 };
        weightServiceStub.find.resolves(foundWeight);

        // WHEN
        comp.retrieveWeight(123);
        await comp.$nextTick();

        // THEN
        expect(comp.weight).toBe(foundWeight);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundWeight = { id: 123 };
        weightServiceStub.find.resolves(foundWeight);

        // WHEN
        comp.beforeRouteEnter({ params: { weightId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.weight).toBe(foundWeight);
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
