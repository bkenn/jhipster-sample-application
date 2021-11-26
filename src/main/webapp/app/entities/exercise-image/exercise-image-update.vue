<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.exerciseImage.home.createOrEditLabel"
          data-cy="ExerciseImageCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.exerciseImage.home.createOrEditLabel')"
        >
          Create or edit a ExerciseImage
        </h2>
        <div>
          <div class="form-group" v-if="exerciseImage.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="exerciseImage.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exerciseImage.uuid')" for="exercise-image-uuid"
              >Uuid</label
            >
            <input
              type="text"
              class="form-control"
              name="uuid"
              id="exercise-image-uuid"
              data-cy="uuid"
              :class="{ valid: !$v.exerciseImage.uuid.$invalid, invalid: $v.exerciseImage.uuid.$invalid }"
              v-model="$v.exerciseImage.uuid.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exerciseImage.image')" for="exercise-image-image"
              >Image</label
            >
            <div>
              <img
                v-bind:src="'data:' + exerciseImage.imageContentType + ';base64,' + exerciseImage.image"
                style="max-height: 100px"
                v-if="exerciseImage.image"
                alt="exerciseImage image"
              />
              <div v-if="exerciseImage.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ exerciseImage.imageContentType }}, {{ byteSize(exerciseImage.image) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('image', 'imageContentType', 'file_image')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_image"
                id="file_image"
                data-cy="image"
                v-on:change="setFileData($event, exerciseImage, 'image', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="exercise-image-image"
              data-cy="image"
              :class="{ valid: !$v.exerciseImage.image.$invalid, invalid: $v.exerciseImage.image.$invalid }"
              v-model="$v.exerciseImage.image.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="imageContentType"
              id="exercise-image-imageContentType"
              v-model="exerciseImage.imageContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.exerciseImage.main')" for="exercise-image-main"
              >Main</label
            >
            <input
              type="checkbox"
              class="form-check"
              name="main"
              id="exercise-image-main"
              data-cy="main"
              :class="{ valid: !$v.exerciseImage.main.$invalid, invalid: $v.exerciseImage.main.$invalid }"
              v-model="$v.exerciseImage.main.$model"
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
            :disabled="$v.exerciseImage.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./exercise-image-update.component.ts"></script>
