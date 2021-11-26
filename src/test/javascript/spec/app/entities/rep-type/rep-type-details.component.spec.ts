/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import RepTypeDetailComponent from '@/entities/rep-type/rep-type-details.vue';
import RepTypeClass from '@/entities/rep-type/rep-type-details.component';
import RepTypeService from '@/entities/rep-type/rep-type.service';
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
  describe('RepType Management Detail Component', () => {
    let wrapper: Wrapper<RepTypeClass>;
    let comp: RepTypeClass;
    let repTypeServiceStub: SinonStubbedInstance<RepTypeService>;

    beforeEach(() => {
      repTypeServiceStub = sinon.createStubInstance<RepTypeService>(RepTypeService);

      wrapper = shallowMount<RepTypeClass>(RepTypeDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { repTypeService: () => repTypeServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRepType = { id: 123 };
        repTypeServiceStub.find.resolves(foundRepType);

        // WHEN
        comp.retrieveRepType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.repType).toBe(foundRepType);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRepType = { id: 123 };
        repTypeServiceStub.find.resolves(foundRepType);

        // WHEN
        comp.beforeRouteEnter({ params: { repTypeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.repType).toBe(foundRepType);
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
