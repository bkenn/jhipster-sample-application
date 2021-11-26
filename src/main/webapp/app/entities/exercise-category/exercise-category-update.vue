<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.exerciseCategory.home.createOrEditLabel"
          data-cy="ExerciseCategoryCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.exerciseCategory.home.createOrEditLabel')"
        >
          Create or edit a ExerciseCategory
        </h2>
        <div>
          <div class="form-group" v-if="exerciseCategory.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="exerciseCategory.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exerciseCategory.name')" for="exercise-category-name"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              name="name"
              id="exercise-category-name"
              data-cy="name"
              :class="{ valid: !$v.exerciseCategory.name.$invalid, invalid: $v.exerciseCategory.name.$invalid }"
              v-model="$v.exerciseCategory.name.$model"
              required
            />
            <div v-if="$v.exerciseCategory.name.$anyDirty && $v.exerciseCategory.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.exerciseCategory.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.exerciseCategory.categoryOrder')"
              for="exercise-category-categoryOrder"
              >Category Order</label
            >
            <input
              type="number"
              class="form-control"
              name="categoryOrder"
              id="exercise-category-categoryOrder"
              data-cy="categoryOrder"
              :class="{ valid: !$v.exerciseCategory.categoryOrder.$invalid, invalid: $v.exerciseCategory.categoryOrder.$invalid }"
              v-model.number="$v.exerciseCategory.categoryOrder.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.exerciseCategory.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./exercise-category-update.component.ts"></script>
