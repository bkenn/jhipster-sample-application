<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="weight">
        <h2 class="jh-entity-heading" data-cy="weightDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.weight.detail.title')">Weight</span> {{ weight.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.weight.value')">Value</span>
          </dt>
          <dd>
            <span>{{ weight.value }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.weight.weightDateTime')">Weight Date Time</span>
          </dt>
          <dd>
            <span v-if="weight.weightDateTime">{{ $d(Date.parse(weight.weightDateTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.weight.measurementType')">Measurement Type</span>
          </dt>
          <dd>
            <div v-if="weight.measurementType">
              <router-link :to="{ name: 'MeasurementTypeView', params: { measurementTypeId: weight.measurementType.id } }">{{
                weight.measurementType.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="weight.id" :to="{ name: 'WeightEdit', params: { weightId: weight.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./weight-details.component.ts"></script>
