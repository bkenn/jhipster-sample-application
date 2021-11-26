/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WeightComponent from '@/entities/weight/weight.vue';
import WeightClass from '@/entities/weight/weight.component';
import WeightService from '@/entities/weight/weight.service';
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
  describe('Weight Management Component', () => {
    let wrapper: Wrapper<WeightClass>;
    let comp: WeightClass;
    let weightServiceStub: SinonStubbedInstance<WeightService>;

    beforeEach(() => {
      weightServiceStub = sinon.createStubInstance<WeightService>(WeightService);
      weightServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<WeightClass>(WeightComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          weightService: () => weightServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      weightServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllWeights();
      await comp.$nextTick();

      // THEN
      expect(weightServiceStub.retrieve.called).toBeTruthy();
      expect(comp.weights[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      weightServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeWeight();
      await comp.$nextTick();

      // THEN
      expect(weightServiceStub.delete.called).toBeTruthy();
      expect(weightServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
