/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import BodyMeasurementDetailComponent from '@/entities/body-measurement/body-measurement-details.vue';
import BodyMeasurementClass from '@/entities/body-measurement/body-measurement-details.component';
import BodyMeasurementService from '@/entities/body-measurement/body-measurement.service';
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
  describe('BodyMeasurement Management Detail Component', () => {
    let wrapper: Wrapper<BodyMeasurementClass>;
    let comp: BodyMeasurementClass;
    let bodyMeasurementServiceStub: SinonStubbedInstance<BodyMeasurementService>;

    beforeEach(() => {
      bodyMeasurementServiceStub = sinon.createStubInstance<BodyMeasurementService>(BodyMeasurementService);

      wrapper = shallowMount<BodyMeasurementClass>(BodyMeasurementDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { bodyMeasurementService: () => bodyMeasurementServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBodyMeasurement = { id: 123 };
        bodyMeasurementServiceStub.find.resolves(foundBodyMeasurement);

        // WHEN
        comp.retrieveBodyMeasurement(123);
        await comp.$nextTick();

        // THEN
        expect(comp.bodyMeasurement).toBe(foundBodyMeasurement);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBodyMeasurement = { id: 123 };
        bodyMeasurementServiceStub.find.resolves(foundBodyMeasurement);

        // WHEN
        comp.beforeRouteEnter({ params: { bodyMeasurementId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.bodyMeasurement).toBe(foundBodyMeasurement);
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
