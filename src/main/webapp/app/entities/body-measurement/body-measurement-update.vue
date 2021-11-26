<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.bodyMeasurement.home.createOrEditLabel"
          data-cy="BodyMeasurementCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.home.createOrEditLabel')"
        >
          Create or edit a BodyMeasurement
        </h2>
        <div>
          <div class="form-group" v-if="bodyMeasurement.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="bodyMeasurement.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.value')" for="body-measurement-value"
              >Value</label
            >
            <input
              type="number"
              class="form-control"
              name="value"
              id="body-measurement-value"
              data-cy="value"
              :class="{ valid: !$v.bodyMeasurement.value.$invalid, invalid: $v.bodyMeasurement.value.$invalid }"
              v-model.number="$v.bodyMeasurement.value.$model"
              required
            />
            <div v-if="$v.bodyMeasurement.value.$anyDirty && $v.bodyMeasurement.value.$invalid">
              <small class="form-text text-danger" v-if="!$v.bodyMeasurement.value.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.bodyMeasurement.value.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.bodyMeasurementDateTime')"
              for="body-measurement-bodyMeasurementDateTime"
              >Body Measurement Date Time</label
            >
            <div class="d-flex">
              <input
                id="body-measurement-bodyMeasurementDateTime"
                data-cy="bodyMeasurementDateTime"
                type="datetime-local"
                class="form-control"
                name="bodyMeasurementDateTime"
                :class="{
                  valid: !$v.bodyMeasurement.bodyMeasurementDateTime.$invalid,
                  invalid: $v.bodyMeasurement.bodyMeasurementDateTime.$invalid,
                }"
                :value="convertDateTimeFromServer($v.bodyMeasurement.bodyMeasurementDateTime.$model)"
                @change="updateZonedDateTimeField('bodyMeasurementDateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.measurementType')"
              for="body-measurement-measurementType"
              >Measurement Type</label
            >
            <select
              class="form-control"
              id="body-measurement-measurementType"
              data-cy="measurementType"
              name="measurementType"
              v-model="bodyMeasurement.measurementType"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  bodyMeasurement.measurementType && measurementTypeOption.id === bodyMeasurement.measurementType.id
                    ? bodyMeasurement.measurementType
                    : measurementTypeOption
                "
                v-for="measurementTypeOption in measurementTypes"
                :key="measurementTypeOption.id"
              >
                {{ measurementTypeOption.id }}
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
            :disabled="$v.bodyMeasurement.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./body-measurement-update.component.ts"></script>
