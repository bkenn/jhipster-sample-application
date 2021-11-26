/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProgressPhotoComponent from '@/entities/progress-photo/progress-photo.vue';
import ProgressPhotoClass from '@/entities/progress-photo/progress-photo.component';
import ProgressPhotoService from '@/entities/progress-photo/progress-photo.service';
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
  describe('ProgressPhoto Management Component', () => {
    let wrapper: Wrapper<ProgressPhotoClass>;
    let comp: ProgressPhotoClass;
    let progressPhotoServiceStub: SinonStubbedInstance<ProgressPhotoService>;

    beforeEach(() => {
      progressPhotoServiceStub = sinon.createStubInstance<ProgressPhotoService>(ProgressPhotoService);
      progressPhotoServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProgressPhotoClass>(ProgressPhotoComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          progressPhotoService: () => progressPhotoServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      progressPhotoServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProgressPhotos();
      await comp.$nextTick();

      // THEN
      expect(progressPhotoServiceStub.retrieve.called).toBeTruthy();
      expect(comp.progressPhotos[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      progressPhotoServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProgressPhoto();
      await comp.$nextTick();

      // THEN
      expect(progressPhotoServiceStub.delete.called).toBeTruthy();
      expect(progressPhotoServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
