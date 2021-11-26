<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.progressPhoto.home.createOrEditLabel"
          data-cy="ProgressPhotoCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.progressPhoto.home.createOrEditLabel')"
        >
          Create or edit a ProgressPhoto
        </h2>
        <div>
          <div class="form-group" v-if="progressPhoto.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="progressPhoto.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.progressPhoto.note')" for="progress-photo-note"
              >Note</label
            >
            <input
              type="text"
              class="form-control"
              name="note"
              id="progress-photo-note"
              data-cy="note"
              :class="{ valid: !$v.progressPhoto.note.$invalid, invalid: $v.progressPhoto.note.$invalid }"
              v-model="$v.progressPhoto.note.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.progressPhoto.image')" for="progress-photo-image"
              >Image</label
            >
            <div>
              <img
                v-bind:src="'data:' + progressPhoto.imageContentType + ';base64,' + progressPhoto.image"
                style="max-height: 100px"
                v-if="progressPhoto.image"
                alt="progressPhoto image"
              />
              <div v-if="progressPhoto.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ progressPhoto.imageContentType }}, {{ byteSize(progressPhoto.image) }}</span>
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
                v-on:change="setFileData($event, progressPhoto, 'image', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="progress-photo-image"
              data-cy="image"
              :class="{ valid: !$v.progressPhoto.image.$invalid, invalid: $v.progressPhoto.image.$invalid }"
              v-model="$v.progressPhoto.image.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="imageContentType"
              id="progress-photo-imageContentType"
              v-model="progressPhoto.imageContentType"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.progressPhoto.weightDate')"
              for="progress-photo-weightDate"
              >Weight Date</label
            >
            <div class="d-flex">
              <input
                id="progress-photo-weightDate"
                data-cy="weightDate"
                type="datetime-local"
                class="form-control"
                name="weightDate"
                :class="{ valid: !$v.progressPhoto.weightDate.$invalid, invalid: $v.progressPhoto.weightDate.$invalid }"
                :value="convertDateTimeFromServer($v.progressPhoto.weightDate.$model)"
                @change="updateZonedDateTimeField('weightDate', $event)"
              />
            </div>
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
            :disabled="$v.progressPhoto.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./progress-photo-update.component.ts"></script>
