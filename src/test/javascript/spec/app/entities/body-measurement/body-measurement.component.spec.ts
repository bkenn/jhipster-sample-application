/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BodyMeasurementComponent from '@/entities/body-measurement/body-measurement.vue';
import BodyMeasurementClass from '@/entities/body-measurement/body-measurement.component';
import BodyMeasurementService from '@/entities/body-measurement/body-measurement.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('BodyMeasurement Management Component', () => {
    let wrapper: Wrapper<BodyMeasurementClass>;
    let comp: BodyMeasurementClass;
    let bodyMeasurementServiceStub: SinonStubbedInstance<BodyMeasurementService>;

    beforeEach(() => {
      bodyMeasurementServiceStub = sinon.createStubInstance<BodyMeasurementService>(BodyMeasurementService);
      bodyMeasurementServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<BodyMeasurementClass>(BodyMeasurementComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          bodyMeasurementService: () => bodyMeasurementServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      bodyMeasurementServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllBodyMeasurements();
      await comp.$nextTick();

      // THEN
      expect(bodyMeasurementServiceStub.retrieve.called).toBeTruthy();
      expect(comp.bodyMeasurements[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      bodyMeasurementServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeBodyMeasurement();
      await comp.$nextTick();

      // THEN
      expect(bodyMeasurementServiceStub.delete.called).toBeTruthy();
      expect(bodyMeasurementServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
