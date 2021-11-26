/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import BodyMeasurementUpdateComponent from '@/entities/body-measurement/body-measurement-update.vue';
import BodyMeasurementClass from '@/entities/body-measurement/body-measurement-update.component';
import BodyMeasurementService from '@/entities/body-measurement/body-measurement.service';

import MeasurementTypeService from '@/entities/measurement-type/measurement-type.service';
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
  describe('BodyMeasurement Management Update Component', () => {
    let wrapper: Wrapper<BodyMeasurementClass>;
    let comp: BodyMeasurementClass;
    let bodyMeasurementServiceStub: SinonStubbedInstance<BodyMeasurementService>;

    beforeEach(() => {
      bodyMeasurementServiceStub = sinon.createStubInstance<BodyMeasurementService>(BodyMeasurementService);

      wrapper = shallowMount<BodyMeasurementClass>(BodyMeasurementUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          bodyMeasurementService: () => bodyMeasurementServiceStub,
          alertService: () => new AlertService(),

          measurementTypeService: () => new MeasurementTypeService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.bodyMeasurement = entity;
        bodyMeasurementServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bodyMeasurementServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.bodyMeasurement = entity;
        bodyMeasurementServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bodyMeasurementServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBodyMeasurement = { id: 123 };
        bodyMeasurementServiceStub.find.resolves(foundBodyMeasurement);
        bodyMeasurementServiceStub.retrieve.resolves([foundBodyMeasurement]);

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
