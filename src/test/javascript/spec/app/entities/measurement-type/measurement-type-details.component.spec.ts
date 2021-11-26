/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MeasurementTypeDetailComponent from '@/entities/measurement-type/measurement-type-details.vue';
import MeasurementTypeClass from '@/entities/measurement-type/measurement-type-details.component';
import MeasurementTypeService from '@/entities/measurement-type/measurement-type.service';
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
  describe('MeasurementType Management Detail Component', () => {
    let wrapper: Wrapper<MeasurementTypeClass>;
    let comp: MeasurementTypeClass;
    let measurementTypeServiceStub: SinonStubbedInstance<MeasurementTypeService>;

    beforeEach(() => {
      measurementTypeServiceStub = sinon.createStubInstance<MeasurementTypeService>(MeasurementTypeService);

      wrapper = shallowMount<MeasurementTypeClass>(MeasurementTypeDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { measurementTypeService: () => measurementTypeServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMeasurementType = { id: 123 };
        measurementTypeServiceStub.find.resolves(foundMeasurementType);

        // WHEN
        comp.retrieveMeasurementType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.measurementType).toBe(foundMeasurementType);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMeasurementType = { id: 123 };
        measurementTypeServiceStub.find.resolves(foundMeasurementType);

        // WHEN
        comp.beforeRouteEnter({ params: { measurementTypeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.measurementType).toBe(foundMeasurementType);
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
