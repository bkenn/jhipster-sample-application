<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.exercise.home.createOrEditLabel"
          data-cy="ExerciseCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.exercise.home.createOrEditLabel')"
        >
          Create or edit a Exercise
        </h2>
        <div>
          <div class="form-group" v-if="exercise.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="exercise.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exercise.name')" for="exercise-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="exercise-name"
              data-cy="name"
              :class="{ valid: !$v.exercise.name.$invalid, invalid: $v.exercise.name.$invalid }"
              v-model="$v.exercise.name.$model"
              required
            />
            <div v-if="$v.exercise.name.$anyDirty && $v.exercise.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.exercise.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exercise.description')" for="exercise-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="exercise-description"
              data-cy="description"
              :class="{ valid: !$v.exercise.description.$invalid, invalid: $v.exercise.description.$invalid }"
              v-model="$v.exercise.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exercise.repType')" for="exercise-repType"
              >Rep Type</label
            >
            <select class="form-control" id="exercise-repType" data-cy="repType" name="repType" v-model="exercise.repType">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="exercise.repType && repTypeOption.id === exercise.repType.id ? exercise.repType : repTypeOption"
                v-for="repTypeOption in repTypes"
                :key="repTypeOption.id"
              >
                {{ repTypeOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.exercise.exerciseCategory')"
              for="exercise-exerciseCategory"
              >Exercise Category</label
            >
            <select
              class="form-control"
              id="exercise-exerciseCategory"
              data-cy="exerciseCategory"
              name="exerciseCategory"
              v-model="exercise.exerciseCategory"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  exercise.exerciseCategory && exerciseCategoryOption.id === exercise.exerciseCategory.id
                    ? exercise.exerciseCategory
                    : exerciseCategoryOption
                "
                v-for="exerciseCategoryOption in exerciseCategories"
                :key="exerciseCategoryOption.id"
              >
                {{ exerciseCategoryOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label v-text="$t('jhipsterSampleApplicationApp.exercise.exerciseImage')" for="exercise-exerciseImage">Exercise Image</label>
            <select
              class="form-control"
              id="exercise-exerciseImages"
              data-cy="exerciseImage"
              multiple
              name="exerciseImage"
              v-if="exercise.exerciseImages !== undefined"
              v-model="exercise.exerciseImages"
            >
              <option
                v-bind:value="getSelected(exercise.exerciseImages, exerciseImageOption)"
                v-for="exerciseImageOption in exerciseImages"
                :key="exerciseImageOption.id"
              >
                {{ exerciseImageOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label v-text="$t('jhipsterSampleApplicationApp.exercise.muscle')" for="exercise-muscle">Muscle</label>
            <select
              class="form-control"
              id="exercise-muscles"
              data-cy="muscle"
              multiple
              name="muscle"
              v-if="exercise.muscles !== undefined"
              v-model="exercise.muscles"
            >
              <option v-bind:value="getSelected(exercise.muscles, muscleOption)" v-for="muscleOption in muscles" :key="muscleOption.id">
                {{ muscleOption.id }}
              </option>
            </select>
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
            :disabled="$v.exercise.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./exercise-update.component.ts"></script>
