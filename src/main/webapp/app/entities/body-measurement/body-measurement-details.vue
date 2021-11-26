<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bodyMeasurement">
        <h2 class="jh-entity-heading" data-cy="bodyMeasurementDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.detail.title')">BodyMeasurement</span> {{ bodyMeasurement.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.value')">Value</span>
          </dt>
          <dd>
            <span>{{ bodyMeasurement.value }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.bodyMeasurementDateTime')">Body Measurement Date Time</span>
          </dt>
          <dd>
            <span v-if="bodyMeasurement.bodyMeasurementDateTime">{{
              $d(Date.parse(bodyMeasurement.bodyMeasurementDateTime), 'long')
            }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.bodyMeasurement.measurementType')">Measurement Type</span>
          </dt>
          <dd>
            <div v-if="bodyMeasurement.measurementType">
              <router-link :to="{ name: 'MeasurementTypeView', params: { measurementTypeId: bodyMeasurement.measurementType.id } }">{{
                bodyMeasurement.measurementType.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="bodyMeasurement.id"
          :to="{ name: 'BodyMeasurementEdit', params: { bodyMeasurementId: bodyMeasurement.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./body-measurement-details.component.ts"></script>
