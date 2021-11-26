/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import RepTypeComponent from '@/entities/rep-type/rep-type.vue';
import RepTypeClass from '@/entities/rep-type/rep-type.component';
import RepTypeService from '@/entities/rep-type/rep-type.service';
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
  describe('RepType Management Component', () => {
    let wrapper: Wrapper<RepTypeClass>;
    let comp: RepTypeClass;
    let repTypeServiceStub: SinonStubbedInstance<RepTypeService>;

    beforeEach(() => {
      repTypeServiceStub = sinon.createStubInstance<RepTypeService>(RepTypeService);
      repTypeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RepTypeClass>(RepTypeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          repTypeService: () => repTypeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      repTypeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRepTypes();
      await comp.$nextTick();

      // THEN
      expect(repTypeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.repTypes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      repTypeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeRepType();
      await comp.$nextTick();

      // THEN
      expect(repTypeServiceStub.delete.called).toBeTruthy();
      expect(repTypeServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
