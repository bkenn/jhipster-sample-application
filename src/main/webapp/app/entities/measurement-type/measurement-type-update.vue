<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.measurementType.home.createOrEditLabel"
          data-cy="MeasurementTypeCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.measurementType.home.createOrEditLabel')"
        >
          Create or edit a MeasurementType
        </h2>
        <div>
          <div class="form-group" v-if="measurementType.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="measurementType.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.measurementType.name')" for="measurement-type-name"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              name="name"
              id="measurement-type-name"
              data-cy="name"
              :class="{ valid: !$v.measurementType.name.$invalid, invalid: $v.measurementType.name.$invalid }"
              v-model="$v.measurementType.name.$model"
              required
            />
            <div v-if="$v.measurementType.name.$anyDirty && $v.measurementType.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.measurementType.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.measurementType.description')"
              for="measurement-type-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="measurement-type-description"
              data-cy="description"
              :class="{ valid: !$v.measurementType.description.$invalid, invalid: $v.measurementType.description.$invalid }"
              v-model="$v.measurementType.description.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.measurementType.measurementOrder')"
              for="measurement-type-measurementOrder"
              >Measurement Order</label
            >
            <input
              type="number"
              class="form-control"
              name="measurementOrder"
              id="measurement-type-measurementOrder"
              data-cy="measurementOrder"
              :class="{ valid: !$v.measurementType.measurementOrder.$invalid, invalid: $v.measurementType.measurementOrder.$invalid }"
              v-model.number="$v.measurementType.measurementOrder.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.measurementType.measurementUnit')"
              for="measurement-type-measurementUnit"
              >Measurement Unit</label
            >
            <input
              type="text"
              class="form-control"
              name="measurementUnit"
              id="measurement-type-measurementUnit"
              data-cy="measurementUnit"
              :class="{ valid: !$v.measurementType.measurementUnit.$invalid, invalid: $v.measurementType.measurementUnit.$invalid }"
              v-model="$v.measurementType.measurementUnit.$model"
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
            :disabled="$v.measurementType.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./measurement-type-update.component.ts"></script>
