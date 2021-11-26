/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProgressPhotoDetailComponent from '@/entities/progress-photo/progress-photo-details.vue';
import ProgressPhotoClass from '@/entities/progress-photo/progress-photo-details.component';
import ProgressPhotoService from '@/entities/progress-photo/progress-photo.service';
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
  describe('ProgressPhoto Management Detail Component', () => {
    let wrapper: Wrapper<ProgressPhotoClass>;
    let comp: ProgressPhotoClass;
    let progressPhotoServiceStub: SinonStubbedInstance<ProgressPhotoService>;

    beforeEach(() => {
      progressPhotoServiceStub = sinon.createStubInstance<ProgressPhotoService>(ProgressPhotoService);

      wrapper = shallowMount<ProgressPhotoClass>(ProgressPhotoDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { progressPhotoService: () => progressPhotoServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProgressPhoto = { id: 123 };
        progressPhotoServiceStub.find.resolves(foundProgressPhoto);

        // WHEN
        comp.retrieveProgressPhoto(123);
        await comp.$nextTick();

        // THEN
        expect(comp.progressPhoto).toBe(foundProgressPhoto);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProgressPhoto = { id: 123 };
        progressPhotoServiceStub.find.resolves(foundProgressPhoto);

        // WHEN
        comp.beforeRouteEnter({ params: { progressPhotoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.progressPhoto).toBe(foundProgressPhoto);
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
