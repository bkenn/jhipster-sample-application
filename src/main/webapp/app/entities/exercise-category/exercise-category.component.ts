import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IExerciseCategory } from '@/shared/model/exercise-category.model';

import ExerciseCategoryService from './exercise-category.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ExerciseCategory extends Vue {
  @Inject('exerciseCategoryService') private exerciseCategoryService: () => ExerciseCategoryService;
  @Inject('alertService') private alertService: () => AlertService;

  public currentSearch = '';
  private removeId: number = null;

  public exerciseCategories: IExerciseCategory[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllExerciseCategorys();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllExerciseCategorys();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllExerciseCategorys();
  }

  public retrieveAllExerciseCategorys(): void {
    this.isFetching = true;
    if (this.currentSearch) {
      this.exerciseCategoryService()
        .search(this.currentSearch)
        .then(
          res => {
            this.exerciseCategories = res;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
            this.alertService().showHttpError(this, err.response);
          }
        );
      return;
    }
    this.exerciseCategoryService()
      .retrieve()
      .then(
        res => {
          this.exerciseCategories = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IExerciseCategory): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeExerciseCategory(): void {
    this.exerciseCategoryService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.exerciseCategory.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllExerciseCategorys();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
