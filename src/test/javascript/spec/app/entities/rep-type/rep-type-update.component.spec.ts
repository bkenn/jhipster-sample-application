/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import RepTypeUpdateComponent from '@/entities/rep-type/rep-type-update.vue';
import RepTypeClass from '@/entities/rep-type/rep-type-update.component';
import RepTypeService from '@/entities/rep-type/rep-type.service';

import ExerciseService from '@/entities/exercise/exercise.service';
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
  describe('RepType Management Update Component', () => {
    let wrapper: Wrapper<RepTypeClass>;
    let comp: RepTypeClass;
    let repTypeServiceStub: SinonStubbedInstance<RepTypeService>;

    beforeEach(() => {
      repTypeServiceStub = sinon.createStubInstance<RepTypeService>(RepTypeService);

      wrapper = shallowMount<RepTypeClass>(RepTypeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          repTypeService: () => repTypeServiceStub,
          alertService: () => new AlertService(),

          exerciseService: () => new ExerciseService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.repType = entity;
        repTypeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(repTypeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.repType = entity;
        repTypeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(repTypeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRepType = { id: 123 };
        repTypeServiceStub.find.resolves(foundRepType);
        repTypeServiceStub.retrieve.resolves([foundRepType]);

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
