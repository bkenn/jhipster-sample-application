/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import MeasurementTypeUpdateComponent from '@/entities/measurement-type/measurement-type-update.vue';
import MeasurementTypeClass from '@/entities/measurement-type/measurement-type-update.component';
import MeasurementTypeService from '@/entities/measurement-type/measurement-type.service';

import BodyMeasurementService from '@/entities/body-measurement/body-measurement.service';

import WeightService from '@/entities/weight/weight.service';
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
  describe('MeasurementType Management Update Component', () => {
    let wrapper: Wrapper<MeasurementTypeClass>;
    let comp: MeasurementTypeClass;
    let measurementTypeServiceStub: SinonStubbedInstance<MeasurementTypeService>;

    beforeEach(() => {
      measurementTypeServiceStub = sinon.createStubInstance<MeasurementTypeService>(MeasurementTypeService);

      wrapper = shallowMount<MeasurementTypeClass>(MeasurementTypeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          measurementTypeService: () => measurementTypeServiceStub,
          alertService: () => new AlertService(),

          bodyMeasurementService: () => new BodyMeasurementService(),

          weightService: () => new WeightService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.measurementType = entity;
        measurementTypeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(measurementTypeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.measurementType = entity;
        measurementTypeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(measurementTypeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMeasurementType = { id: 123 };
        measurementTypeServiceStub.find.resolves(foundMeasurementType);
        measurementTypeServiceStub.retrieve.resolves([foundMeasurementType]);

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
