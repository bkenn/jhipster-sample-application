<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.weight.home.createOrEditLabel"
          data-cy="WeightCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.weight.home.createOrEditLabel')"
        >
          Create or edit a Weight
        </h2>
        <div>
          <div class="form-group" v-if="weight.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="weight.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.weight.value')" for="weight-value">Value</label>
            <input
              type="number"
              class="form-control"
              name="value"
              id="weight-value"
              data-cy="value"
              :class="{ valid: !$v.weight.value.$invalid, invalid: $v.weight.value.$invalid }"
              v-model.number="$v.weight.value.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.weight.weightDateTime')" for="weight-weightDateTime"
              >Weight Date Time</label
            >
            <div class="d-flex">
              <input
                id="weight-weightDateTime"
                data-cy="weightDateTime"
                type="datetime-local"
                class="form-control"
                name="weightDateTime"
                :class="{ valid: !$v.weight.weightDateTime.$invalid, invalid: $v.weight.weightDateTime.$invalid }"
                :value="convertDateTimeFromServer($v.weight.weightDateTime.$model)"
                @change="updateZonedDateTimeField('weightDateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.weight.measurementType')"
              for="weight-measurementType"
              >Measurement Type</label
            >
            <select
              class="form-control"
              id="weight-measurementType"
              data-cy="measurementType"
              name="measurementType"
              v-model="weight.measurementType"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  weight.measurementType && measurementTypeOption.id === weight.measurementType.id
                    ? weight.measurementType
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
            :disabled="$v.weight.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./weight-update.component.ts"></script>
