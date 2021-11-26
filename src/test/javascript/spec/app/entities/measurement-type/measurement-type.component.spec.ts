/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MeasurementTypeComponent from '@/entities/measurement-type/measurement-type.vue';
import MeasurementTypeClass from '@/entities/measurement-type/measurement-type.component';
import MeasurementTypeService from '@/entities/measurement-type/measurement-type.service';
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
  describe('MeasurementType Management Component', () => {
    let wrapper: Wrapper<MeasurementTypeClass>;
    let comp: MeasurementTypeClass;
    let measurementTypeServiceStub: SinonStubbedInstance<MeasurementTypeService>;

    beforeEach(() => {
      measurementTypeServiceStub = sinon.createStubInstance<MeasurementTypeService>(MeasurementTypeService);
      measurementTypeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MeasurementTypeClass>(MeasurementTypeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          measurementTypeService: () => measurementTypeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      measurementTypeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMeasurementTypes();
      await comp.$nextTick();

      // THEN
      expect(measurementTypeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.measurementTypes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      measurementTypeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeMeasurementType();
      await comp.$nextTick();

      // THEN
      expect(measurementTypeServiceStub.delete.called).toBeTruthy();
      expect(measurementTypeServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
