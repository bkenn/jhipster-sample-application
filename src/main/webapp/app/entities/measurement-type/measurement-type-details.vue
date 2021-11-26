<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="measurementType">
        <h2 class="jh-entity-heading" data-cy="measurementTypeDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.measurementType.detail.title')">MeasurementType</span> {{ measurementType.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.measurementType.name')">Name</span>
          </dt>
          <dd>
            <span>{{ measurementType.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.measurementType.description')">Description</span>
          </dt>
          <dd>
            <span>{{ measurementType.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.measurementType.measurementOrder')">Measurement Order</span>
          </dt>
          <dd>
            <span>{{ measurementType.measurementOrder }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.measurementType.measurementUnit')">Measurement Unit</span>
          </dt>
          <dd>
            <span>{{ measurementType.measurementUnit }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="measurementType.id"
          :to="{ name: 'MeasurementTypeEdit', params: { measurementTypeId: measurementType.id } }"
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

<script lang="ts" src="./measurement-type-details.component.ts"></script>
