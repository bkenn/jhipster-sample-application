import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import AlertService from '@/shared/alert/alert.service';

import ExerciseService from '@/entities/exercise/exercise.service';
import { IExercise } from '@/shared/model/exercise.model';

import { IExerciseImage, ExerciseImage } from '@/shared/model/exercise-image.model';
import ExerciseImageService from './exercise-image.service';

const validations: any = {
  exerciseImage: {
    uuid: {},
    image: {},
    main: {},
  },
};

@Component({
  validations,
})
export default class ExerciseImageUpdate extends mixins(JhiDataUtils) {
  @Inject('exerciseImageService') private exerciseImageService: () => ExerciseImageService;
  @Inject('alertService') private alertService: () => AlertService;

  public exerciseImage: IExerciseImage = new ExerciseImage();

  @Inject('exerciseService') private exerciseService: () => ExerciseService;

  public exercises: IExercise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.exerciseImageId) {
        vm.retrieveExerciseImage(to.params.exerciseImageId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.exerciseImage.id) {
      this.exerciseImageService()
        .update(this.exerciseImage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.exerciseImage.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.exerciseImageService()
        .create(this.exerciseImage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.exerciseImage.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveExerciseImage(exerciseImageId): void {
    this.exerciseImageService()
      .find(exerciseImageId)
      .then(res => {
        this.exerciseImage = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.exerciseImage && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.exerciseImage, field)) {
        this.exerciseImage[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.exerciseImage, fieldContentType)) {
        this.exerciseImage[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.exerciseService()
      .retrieve()
      .then(res => {
        this.exercises = res.data;
      });
  }
}
